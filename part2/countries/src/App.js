import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import DisplaySearchResults from './components/DisplaySearchResults';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => setCountries([...data]));
  }, []);

  return (
    <>
      <SearchForm searchTerm={searchTerm} setter={setSearchTerm} />
      <section>
        <DisplaySearchResults countries={countries} searchTerm={searchTerm} />
      </section>
    </>

  );
}

export default App;
