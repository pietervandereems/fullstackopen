import React, { useState } from 'react';
import './country.css';

const DisplayLanguage = ({ language: { name } }) => (
  <li>
    {name}
  </li>
);

const DisplayCountry = ({ country }) => {
  if (!country.name) {
    return <></>;
  }
  return (
    <section>
      <h1>{country.name}</h1>
    capital {country.capital} <br />
    population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <DisplayLanguage key={language.iso639_1} language={language} />)}
      </ul>
      <img src={country.flag} alt="flag" />
    </section>
  );
}

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
      </>
    )
  }

  const changeSelectedCountry = (country) => () => setSelectedCountry(country);

  return (
    <>
      {foundCountries.map(country =>
        <DisplayCountryItem key={country.name} country={country} setSelectedCountry={changeSelectedCountry(country)} />)}
      <DisplayCountry country={selectedCountry} />
    </>
  );
};

export default DisplaySearchResults;