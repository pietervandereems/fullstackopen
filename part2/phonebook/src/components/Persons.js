import React from 'react';
import personService from '../services/personService';

const Person = ({ person: { id, name, number }, filter }) => {

  const requestDelete = () => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          filter();
        });
    }
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={requestDelete}>delete</button></td>
      </tr>
    </>
  );
};

const Persons = ({ list = [], setPersons }) => {
  const filterPersons = (personId) => () => {
    setPersons(list.filter(({ id }) => id !== personId));
  };
  return (
    <section>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {list.map(person => <Person key={person.id} person={person} filter={filterPersons(person.id)} />)}
        </tbody>
      </table>
    </section>
  );
};

export default Persons;
