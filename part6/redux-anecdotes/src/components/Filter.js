import React from 'react';
import { setFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Filter = ({ setFilter }) => {
  const handleChange = ({ target: { value } }) => setFilter(value);

  const style = {
    marginBottom: 10
  };

  return (
    <p style={style}>
      filter <input onChange={handleChange} />
    </p>
  );
};

const mapDispatchToProps = {
  setFilter
};

Filter.propTypes = {
  setFilter: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Filter);
