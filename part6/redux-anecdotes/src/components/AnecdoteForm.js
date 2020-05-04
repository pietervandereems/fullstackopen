import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AnecdoteForm = ({ createAnecdote }) => {

  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createAnecdote(anecdote);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <input name="anecdote" /><br />
        <button type="submit">create</button>
      </form>
    </>
  );
};
const mapDispatchToProps = {
  createAnecdote
};

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
