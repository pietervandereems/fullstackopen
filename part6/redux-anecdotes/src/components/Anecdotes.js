import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeAVote } from '../reducers/anecdoteReducer';

const Anecdotes = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => dispatch(makeAVote(id));

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <article key={anecdote.id}>
          <p>
            {anecdote.content} <br />
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </p>
        </article>
      )}
    </>
  );

};


export default Anecdotes;
