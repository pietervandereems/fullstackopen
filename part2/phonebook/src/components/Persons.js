import React from 'react';

const Person = ({ person: { id, name, number }, removePerson }) => {

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

export default Persons;
