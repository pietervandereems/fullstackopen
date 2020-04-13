import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ setter }) => {
  const handleFilterChange = ({ target: { value } }) => setter(value);

  return (
    <section>
      <label>filter shown with <input onChange={handleFilterChange} /></label>
    </section>
  );
};

Filter.propTypes = {
  setter: PropTypes.func
};

export default Filter;
