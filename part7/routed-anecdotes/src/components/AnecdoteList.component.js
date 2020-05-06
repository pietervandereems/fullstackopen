import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AnecdoteList = ({ anecdotes }) => (
  <section>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </section>
);

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array
};

export default AnecdoteList;
