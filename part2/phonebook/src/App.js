import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [filter, setFilter] = useState('');

  const addPerson = ({ newPerson, cleanInputs }) => (event) => {
    event.preventDefault();

    if (persons.reduce((acc, p) => acc ? acc : p.name.toUpperCase() === newPerson.name.toUpperCase(), false)) {
      window.alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    setPersons(persons.concat([{ ...newPerson }]));
    cleanInputs();
  };

  const personFilter = (searchTerm) => searchTerm ?
    (person) => person.name.toUpperCase().includes(searchTerm.toUpperCase()) :
    () => true;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setter={setFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} />
      <Persons list={persons.filter(personFilter(filter))} />
    </div>
  );
};

export default App;
