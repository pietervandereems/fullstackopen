import React, { useState } from 'react';
import PropTypes from 'prop-types';


const PersonForm = ({ addPerson }) => {
  const [newPerson, setPerson] = useState({ name: '', number: '' });

  const setName = ({ target: { value } }) => {
    setPerson({
      ...newPerson,
      name: value
    });
  };

  const setNumber = ({ target: { value } }) => {
    setPerson({
      ...newPerson,
      number: value
    });
  };

  const cleanInputs = () => {
    setPerson({ name: '', number: '' });
  };

  return (
    <form onSubmit={addPerson({ newPerson, cleanInputs })}>
      <label>name: <input value={newPerson.name} onChange={setName} /></label><br />
      <label>number: <input value={newPerson.number} onChange={setNumber} /></label><br />
      <button type="submit">add</button>
    </form>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func
};

export default PersonForm;
