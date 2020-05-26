const { v1: uuid } = require('uuid');
let { authors, books } = require('../data');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => authors.length,
    allBooks: (root, args) =>
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
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      if (authors.findIndex(author => author.name === args.author) === -1) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name);
      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author);
      return updatedAuthor;
    }
  }
};

module.exports = resolvers;