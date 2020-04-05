import React, { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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

  const personFilter = (searchTerm) => searchTerm ? 
    (person) => person.name.toUpperCase().includes(searchTerm.toUpperCase()) :
    () => true;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setter={setFilter} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <label>name: <input value={newName} onChange={handlePersonChange} /></label><br />
        <label>number: <input value={newNumber} onChange={handleNumberChange} /></label><br />
        <button type="submit">add</button>
      </form>
      <Persons list={persons.filter(personFilter(filter))} />
    </div>
  );
};

export default App;
