import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SET_BORN_AUTHOR, ALL_AUTHORS } from '../queries';

const ChangeBorn = () => {
  const [setBornAuthor] = useMutation(SET_BORN_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    setBornAuthor({ variables: { name, setBornTo: parseInt(born, 10) } });

    setName('');
    setBorn('');
  };

  return (
    <section>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <label>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label><br />
        <label>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </label><br />
        <button type='submit'>update author</button>
      </form>
    </section>
  );
};

export default ChangeBorn;
