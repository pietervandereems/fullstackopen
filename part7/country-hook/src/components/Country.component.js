import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <>
        not found...
      </>
    );
  }

  return (
    <>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </>
  );
};

Country.propTypes = {
  country: PropTypes.shape({
    found: PropTypes.bool,
    name: PropTypes.string,
    capital: PropTypes.string,
    population: PropTypes.number,
    flag: PropTypes.string,
  })
};

export default Country;
