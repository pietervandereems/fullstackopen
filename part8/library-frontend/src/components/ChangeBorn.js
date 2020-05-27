import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SET_BORN_AUTHOR, ALL_AUTHORS } from '../queries';
import Select from 'react-select';

const ChangeBorn = () => {
  const [setBornAuthor] = useMutation(SET_BORN_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const authorResults = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  if (authorResults.loading) {
    return <>Loading...</>;
  }
  const authorList = authorResults.data.allAuthors.map(author => ({ value: author.name, label: author.name }));

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
          <Select options={authorList} value={{ value: name, label: name }} onChange={({ value }) => setName(value)} isSearchable="true" />
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
