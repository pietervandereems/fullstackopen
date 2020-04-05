import React from 'react';

const Person = ({ name }) => (
  <>
    {name} < br />
  </>
);

const Numbers = ({ list }) => (
  <section>
    <h2>Numbers</h2>
    {list.map(person => <Person key={person.name} name={person.name} />)}
  </section>
);

export default Numbers;
