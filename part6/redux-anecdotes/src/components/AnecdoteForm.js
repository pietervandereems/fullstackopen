import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes.service';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const savedAnecdote = await anecdoteService.addAnecdote(anecdote);
    dispatch(createAnecdote(savedAnecdote));
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


export default AnecdoteForm;
