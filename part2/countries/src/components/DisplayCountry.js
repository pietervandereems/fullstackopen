import React from 'react';
import './country.css';

const DisplayLanguage = ({ language: { name } }) => (
  <li>
    {name}
  </li>
);

const DisplayCountry = ({ country }) => (
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

export default DisplayCountry;
