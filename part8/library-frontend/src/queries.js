import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      token,
      user {
        favoriteGenre
      }
    }
  }
`;

export const ME = gql`
query {
  me {
    username,
    favoriteGenre
  }
}
`;

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    id
    name
    born
    bookCount
  }
}
`;

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`;

export const GENRE_BOOKS = gql`
query genre($genre: String!) {
  genreBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`;

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [Genre!]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
    }
    published
    genres
  }
}
`;

export const SET_BORN_AUTHOR = gql`
mutation setBornAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    id
  }
}`;
