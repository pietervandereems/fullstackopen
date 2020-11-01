import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { GENRE_BOOKS } from '../queries';
import Genre from './Genre';

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres');
  const [getBook, { loading, data }] = useLazyQuery(GENRE_BOOKS);

  useEffect(() => {
    const genreRequest = (genre === 'all genres') ? '*' : genre;
    return getBook({ variables: { genre: genreRequest } });
  }, [genre, getBook]);

  if (!show) {
    return null;
  }

  if (loading) {
    return <>loading...</>;
  }

  const books = data.genreBooks;

  return (
    <>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Genre setGenre={setGenre}></Genre>
    </>
  );
};

Books.propTypes = {
  show: PropTypes.bool
};

export default Books;
