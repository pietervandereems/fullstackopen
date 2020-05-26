const { gql } = require('apollo-server');

const typeDefs = gql`
  enum Genre {  classic revolution crime refactoring design patterns agile }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount : Int!,
    authorCount: Int!,
    allBooks(author:String, genre: String): [Book!]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [Genre!]
    ): Book!,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`;

module.exports = typeDefs;