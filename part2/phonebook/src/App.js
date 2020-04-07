import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const eventHandler = response => setPersons([...response]);

    personService.getAll()
      .then(eventHandler);

  }, []);

  const sendNotification = (note = { txt: '', isError: false }) => {
    setNotification(note);
    setTimeout(() => setNotification({ txt: '' }), 5000);
  };

  const addPerson = ({ newPerson, cleanInputs }) => (event) => {
    event.preventDefault();

    const preExistingPerson = persons.filter(p => p.name.toUpperCase() === newPerson.name.toUpperCase());
    if (preExistingPerson.length > 0) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update({ ...preExistingPerson[0], number: newPerson.number })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            sendNotification({ txt: `Changed ${updatedPerson.name}` });
          })
          .catch(err => {
            sendNotification({ txt: `Could not update ${newPerson.name}`, isError: true });
          });
      }
      return;
    }

    personService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat([createdPerson]));
        sendNotification({ txt: `Added ${createdPerson.name}` });
      }).catch(err => {
        sendNotification({ txt: `Could not create ${newPerson.name}`, isError: true });
      });;
    cleanInputs();
  };


  const removePerson = ({ name, id }) => () => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(({ id: personId }) => personId !== id));
          sendNotification({ txt: `Deleted ${name}` });
        })
        .catch(err => {
          sendNotification({ txt: `Could not delete ${name}`, isError: true });
        });
    }
  };


  const personFilter = (searchTerm) => searchTerm ?
    (person) => person.name.toUpperCase().includes(searchTerm.toUpperCase()) :
    () => true;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setter={setFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} />
      <Persons list={persons.filter(personFilter(filter))} removePerson={removePerson} />
    </div>
  );
};

export default App;
