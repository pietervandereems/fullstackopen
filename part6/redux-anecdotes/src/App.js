import React, { useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes.service';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll()
      .then(notes => dispatch(initializeAnecdotes(notes)));
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
