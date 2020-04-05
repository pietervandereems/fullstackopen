import React from 'react';

const Person = ({ name, number }) => (
  <>
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  </>
);

const Numbers = ({ list }) => (
  <section>
    <h2>Numbers</h2>
    <table>
      <tbody>
        {list.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
      </tbody>
    </table>
  </section>
);

export default Numbers;
