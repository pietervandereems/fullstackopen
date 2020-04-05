import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const eventHandler = response => setPersons([...response.data]);

    axios
      .get('http://localhost:3001/persons')
      .then(eventHandler);

  }, []);


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
