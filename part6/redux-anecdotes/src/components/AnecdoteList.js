import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeAVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.filter ?
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())) :
    state.anecdotes
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
    dispatch(makeAVote(anecdote));
  };

  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <article key={anecdote.id}>
          <p>
            {anecdote.content} <br />
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </p>
        </article>
      )}
    </>
  );

};


export default AnecdoteList;
