import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { GENRE_BOOKS } from '../queries';
import ListBooks from './ListBooks';

const Recommendations = ({ show, favorite }) => {
  const [getBook, { loading, data }] = useLazyQuery(GENRE_BOOKS);

  useEffect(() => {
    const genre = (favorite === 'all genres') ? '*' : favorite;
    return getBook({ variables: { genre } });
  }, [favorite, getBook]);

  if (!show) {
    return null;
  }

  if (loading) {
    return <>loading...</>;
  }

  const books = data.genreBooks;

  return (
    <>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favorite}</strong></p>
      <ListBooks books={books} />
    </>
  );
};

Recommendations.propTypes = {
  show: PropTypes.bool,
  favorite: PropTypes.string
};

export default Recommendations;
