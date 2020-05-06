import React from 'react';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdote: { content, author, info, votes } }) => (
  <article>
    <h2>{content} by {author}</h2>
    <p>has {votes} votes</p>
    <p>for more info see {info}</p>
  </article>
);

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string,
    author: PropTypes.string,
    info: PropTypes.string,
    votes: PropTypes.number
  })
};

export default Anecdote;
