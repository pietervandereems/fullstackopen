import React from 'react';
import { makeAVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AnecdoteList = ({ anecdotes, makeAVote, setNotification }) => {

  const vote = (anecdote) => {
    setNotification(`you voted '${anecdote.content}'`, 10);
    makeAVote(anecdote);
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

const mapStateToProps = ({ anecdotes, filter }) => ({
  anecdotes: filter ?
    anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) :
    anecdotes
});

const mapDispatchToProps = {
  makeAVote,
  setNotification
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array,
  makeAVote: PropTypes.func,
  setNotification: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
