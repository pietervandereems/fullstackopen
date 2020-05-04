import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { makeAVote } from '../reducers/anecdoteReducer';
// import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AnecdoteList = ({ anecdotes }) => (
  <>
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <article key={anecdote.id}>
        <p>
          {anecdote.content} <br />
            has {anecdote.votes}
          <button onClick={() => true}>vote</button>
        </p>
      </article>
    )}
  </>
);

const mapStateToProps = ({ anecdotes, filter }) => ({
  anecdotes: filter ?
    anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) :
    anecdotes
});

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array
};

export default connect(mapStateToProps)(AnecdoteList);
