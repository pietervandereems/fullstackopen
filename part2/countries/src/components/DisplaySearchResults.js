import React, { useState } from 'react';
import DisplayCountry from './DisplayCountry';
import Weather from './Weather';

const DisplayCountryItem = ({ country, setSelectedCountry }) => (
  <>
    {country.name} <button onClick={setSelectedCountry}>show</button><br />
  </>
);

const DisplaySearchResults = ({ countries, searchTerm = '' }) => {
  const [selectedCountry, setSelectedCountry] = useState({});

  if (searchTerm === '') {
    return <></>;
  }

  const foundCountries = countries.filter(({ name }) => name.toUpperCase().includes(searchTerm.toUpperCase()));

  if (foundCountries.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }

  if (foundCountries.length === 0) {
    return (
      <>
        No countries found, specify another filter
      </>
    );
  }

  if (foundCountries.length === 1) {
    return (
      <>
        <DisplayCountry country={foundCountries[0]} />
        <Weather country={foundCountries[0]} />
      </>
    )
  }

  const changeSelectedCountry = (country) => () => setSelectedCountry(country);

  return (
    <>
      {foundCountries.map(country =>
        <DisplayCountryItem key={country.name} country={country} setSelectedCountry={changeSelectedCountry(country)} />)}
      {selectedCountry.name ? <DisplayCountry country={selectedCountry} /> : ''}
      {selectedCountry.capital ? <Weather country={selectedCountry} /> : ''}
    </>
  );
};

export default DisplaySearchResults;