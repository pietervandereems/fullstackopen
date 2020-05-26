import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
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
  }
}
`;

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [Genre!]) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title,
    author,
    published,
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
