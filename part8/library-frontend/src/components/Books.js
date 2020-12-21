import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Genre from './Genre';
import ListBooks from './ListBooks';
import { useSubscription, useApolloClient, useLazyQuery } from '@apollo/client';
import { BOOK_ADDED, GENRE_BOOKS, ALL_BOOKS } from '../queries';


const Books = ({ show }) => {
  const [genre, setGenre] = useState('all genres');
  const [getBook, { loading, data }] = useLazyQuery(GENRE_BOOKS, {
    fetchPolicy: 'cache-first'
  });
  // const allBooks = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    const genreRequest = (genre === 'all genres') ? '*' : genre;
    return getBook({ variables: { genre: genreRequest } });
  }, [genre, getBook]);


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.title).includes(object.title);

    const fullCache = client.cache.extract();
    Object.keys(fullCache.ROOT_QUERY)
      .filter(key => key.startsWith('genreBooks'))
      .forEach(key => {
        const genre = JSON.parse(key.substring(11, key.length - 1)).genre;
        if (genre === '*' || addedBook.genres.includes(genre)) {
          if (!includedIn(fullCache.ROOT_QUERY[key], addedBook)) {
            client.writeQuery({
              query: GENRE_BOOKS,
              variables: { genre },
              data: { genreBooks: fullCache.ROOT_QUERY[key].concat(addedBook) }
            });
          }
        }
      });

    if (fullCache.ROOT_QUERY.allBooks) {
      if (!includedIn(fullCache.ROOT_QUERY.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks: fullCache.ROOT_QUERY.allBooks.concat(addedBook) }
        });
      }
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData: { data: { bookAdded } } }) => {
      updateCacheWith(bookAdded);
    }
  });


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
      <ListBooks books={books} />
      <Genre setGenre={setGenre} />
    </>
  );
};

Books.propTypes = {
  show: PropTypes.bool
};

export default Books;
