import React, { useState } from 'react';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.reduce((acc, person) => acc ? acc : person.name === newName, false)) {
      window.alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons(persons.concat([{ name: newName }]));
  };

  const handlePersonChange = ({ target: { value } }) => {
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
