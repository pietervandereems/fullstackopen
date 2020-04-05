import React from 'react';

const SearchForm = ({ searchTerm, setter }) => {
  const setSearchTerm = ({ target: { value } }) => {
    setter(value);
  };
  return (
    <>
      <label>find countries <input value={searchTerm} onChange={setSearchTerm} /></label>
    </>
  );
};

export default SearchForm;