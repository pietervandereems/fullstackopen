import React from 'react';
import { setFilter } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = ({ target: { value } }) => dispatch(setFilter(value));

  const style = {
    marginBottom: 10
  };

  return (
    <p style={style}>
      filter <input onChange={handleChange} />
    </p>
  );
};

export default Filter;
