import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person: { name, number }, removePerson }) => {

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={removePerson}>delete</button></td>
      </tr>
    </>
  );
};

const Persons = ({ list = [], removePerson }) => {

  return (
    <section>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {list.map(person => <Person key={person.id} person={person} removePerson={removePerson(person)} />)}
        </tbody>
      </table>
    </section>
  );
};

Person.propTypes = {
  person: {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  },
  removePerson: PropTypes.func
};

Persons.propTypes = {
  list: PropTypes.array,
  removePerson: PropTypes.func
};


export default Persons;
