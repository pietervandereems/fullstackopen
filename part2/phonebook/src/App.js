import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const eventHandler = response => setPersons([...response]);

    personService.getAll()
      .then(eventHandler);

  }, []);


  const addPerson = ({ newPerson, cleanInputs }) => (event) => {
    event.preventDefault();

    const preExistingPerson = persons.filter(p => p.name.toUpperCase() === newPerson.name.toUpperCase());
    if (preExistingPerson.length > 0) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update({ ...preExistingPerson[0], number: newPerson.number })
          .then(updatedPerson =>
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
          );
      }
      return;
    }

    personService
      .create(newPerson)
      .then(createdPerson =>
        setPersons(persons.concat([createdPerson]))
      );
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
      <Persons list={persons.filter(personFilter(filter))} setPersons={setPersons} />
    </div>
  );
};

export default App;
