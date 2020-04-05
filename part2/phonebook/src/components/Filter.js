import React from 'react';

const Filter = ({ filter, setter }) => {
  const handleFilterChange = ({ target: { value } }) => setter(value);

  return (
    <section>
      <label>filter shown with <input onChange={handleFilterChange} /></label>
    </section>
  );
};

export default Filter;
