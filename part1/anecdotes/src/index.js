import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const DisplayAnecdote = ({ anecdote, votes }) => (
  <>
    {anecdote} <br />
    has { votes} votes <br />
  </>
);

const ShowHighest = ({ anecdotes, votes }) => {
  const highest = votes.reduce((acc, value, index) => value > acc.value ? { value, index }: acc, { value: 0, index: 0 });
  return (
    <section>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdote={anecdotes[highest.index]} votes={highest.value} />
    </section>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    const newResults = [].concat(votes);
    newResults[selected] += 1;
    setVotes(newResults);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={selectAnecdote}>next anecdote</button>
      <ShowHighest anecdotes={anecdotes} votes={votes} />
    </>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));