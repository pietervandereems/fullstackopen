import React, { useState } from 'react';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.reduce((acc, person) => acc ? acc : person.name === newName, false)) {
      window.alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons(persons.concat([{ name: newName, number: newNumber }]));
    setNewName('');
    setNewNumber('');
  };

  const handlePersonChange = ({ target: { value } }) => {
    setNewName(value);
  };

  const handleNumberChange = ({ target: { value } }) => {
    setNewNumber(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label>name: <input value={newName} onChange={handlePersonChange} /></label><br />
        <label>number: <input value={newNumber} onChange={handleNumberChange} /></label><br />
        <button type="submit">add</button>
      </form>
      <Numbers list={persons} />
    </div>
  );
};

export default App;
