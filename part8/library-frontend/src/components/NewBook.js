import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_AUTHORS } from '../queries';

const NewBook = ({ show }) => {
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ],
    awaitRefetchQueries: true
  });
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({ variables: { title, author, published: parseInt(published, 10), genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <>
      <form onSubmit={submit}>
        <label>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label><br />
        <label>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </label><br />
        <label>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </label><br />
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </>
  );
};

NewBook.propTypes = {
  show: PropTypes.bool
};

export default NewBook;
