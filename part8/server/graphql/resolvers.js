const config = require('../utils/config');
const Book = require('../models/book.model');
const Author = require('../models/author.model');
const User = require('../models/user.model');
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () =>
      Book.find({}).populate('author'),
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
    genreBooks: (root, args) => {
      if (args.genre === '*') {
        return Book.find({}).populate('author');
      }
      return Book.find({ genres: { $in: args.genre } }).populate('author');
    }
  },
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secreet') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(userForToken, config.JWT_SECRET);

      return { token, user };
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });

      return user.save()
        .catch(err => {
          throw new UserInputError(err.message, { invalidArgs: args, });
        });
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author;
      const foundAuthors = await Author.find({ name: args.author });
      if (foundAuthors.length === 0) {
        try {
          author = new Author({ name: args.author, bookCount: 1 });
          await author.save();
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args });
        }
      } else {
        author = foundAuthors[0];
        const authorInfo = await Author.findById(author._id).exec();
        await Author.findByIdAndUpdate(author._id, { bookCount: (authorInfo.bookCount || 0) + 1 });
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }

      const fullBook = Book.findById(book._id).populate('author');

      pubsub.publish('BOOK_ADDED', { bookAdded: fullBook });

      return fullBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
        .catch(err => {
          throw new UserInputError(err.message, { invalidArgs: args });
        });
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

module.exports = resolvers;