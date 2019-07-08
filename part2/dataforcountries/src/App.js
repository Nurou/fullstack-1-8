import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import Country from './components/country';
import BasicData from './components/basicData';

const DisplayResults = ({ countries, rows }) => {
  const searchResults = countries.length;
  if (searchResults > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (searchResults === 1) {
    return <BasicData country={countries[0]} />;
  } else {
    return rows();
  }
};

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);

  // function to add id property to countries
  countries.forEach((country, index) => {
    country.id = index;
  });

  // filtering countries based on user search input
  const countriesToList = countries.filter(country => {
    const regex = new RegExp(searchInput, 'gi');
    return country.name.match(regex);
  });

  // country array elements converted to HTML list elements
  const rows = () =>
    countriesToList.map(country => (
      <Country
        key={country.id}
        country={country} //
      />
    ));

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all') //
      .then(response => {
        setCountries(response.data);
      });
  };

  useEffect(hook, []);

  const handleSearchChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <Filter input={searchInput} newSearch={handleSearchChange} />
      <DisplayResults countries={countriesToList} rows={rows} />
    </div>
  );
};

export default App;
