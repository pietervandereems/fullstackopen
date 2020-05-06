import React, { useState } from 'react';
import About from './components/About.component';
import Footer from './components/Footer.component';
import AnecdoteList from './components/AnecdoteList.component';
import Menu from './components/Menu.component';
import CreateNew from './components/CreateNew.component';
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import Anecdote from './components/Anecdote.component';
import Notification from './components/Notification.component';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);
  const [notification, setNotification] = useState('');
  const history = useHistory();

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    history.push('/');
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => setNotification(''), 10000);
  };

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  const match = useRouteMatch('/anecdote/:id');
  const anecdote = match ? anecdoteById(match.params.id) : null;

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />

      <Switch>
        <Route path="/anecdote/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </>
  );
};

export default App;
