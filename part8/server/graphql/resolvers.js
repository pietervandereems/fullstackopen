const config = require('../utils/config');
const Book = require('../models/book.model');
const Author = require('../models/author.model');
const User = require('../models/user.model');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

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
  Author: {
    bookCount: root => Book.countDocuments({ author: root._id })
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
      console.log('resolvers.js, Mutation, login', { userForToken, JWT_SECRET: config.JWT_SECRET });

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
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
          author = new Author({ name: args.author });
          await author.save();
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args });
        }
      } else {
        author = foundAuthors[0];
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }

      return Book.findById(book._id).populate('author');
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
  }
};

module.exports = resolvers;