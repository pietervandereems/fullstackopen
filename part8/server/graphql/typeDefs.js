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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type UserLogin {
    token: String!
    user: User
  }
  
  type Query {
    bookCount : Int!,
    authorCount: Int!,
    allBooks: [Book!]!,
    allAuthors: [Author!]!,
    me: User,
    genreBooks(genre: String): [Book!]!
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
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): UserLogin
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;