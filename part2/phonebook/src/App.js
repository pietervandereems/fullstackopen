import React, { useState } from 'react';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    setPersons(persons.concat([{ name: newName }]));
  };

  const handlePersonChange = ({target:{value}}) => {
    setNewName(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label>name: <input value={newName} onChange={handlePersonChange} /></label><br />
        <button type="submit">add</button>
      </form>
      <Numbers list={persons} />
    </div>
  );
};

export default App;
