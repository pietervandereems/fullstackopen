let { authors } = require('../data');
const Book = require('../models/book.model');
const Author = require('../models/author.model');
const { UserInputError } = require('apollo-server');

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => authors.length,
    allBooks: (/*root, args*/) =>
      // books.filter(book =>
      //   args.author ? book.author === args.author : true
      // ).filter(book =>
      //   args.genre ? book.genres.includes(args.genre) : true
      // ),
      Book.find({}).populate('author'),
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: root => Book.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      let author;
      try {
        author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo });
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
      return author;
    }
  }
};

module.exports = resolvers;