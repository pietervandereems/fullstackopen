import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = ({ target: { value } } = { target: { value: '' } }) => setValue(value);

  return {
    type,
    value,
    onChange
  };
};
