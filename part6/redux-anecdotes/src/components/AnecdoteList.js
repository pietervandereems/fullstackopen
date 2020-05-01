import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeAVote } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  const vote = ({ content, id }) => {
    dispatch(setNotification(`you voted '${content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
    dispatch(makeAVote(id));
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
