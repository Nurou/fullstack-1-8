import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import Country from './components/country';
import BasicData from './components/basicData';
import WeatherInfo from './components/weather';

const App = () => {
  // country data
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState('');
  const [selectedCapital, setSelectedCapital] = useState('');
  const [oneOrMore, setoneOrMore] = useState('false');

  // weather data
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');
  const [windDirection, setwindDirection] = useState('');

  // filtering countries based on user search input
  const countriesToList = countries.filter(country => {
    const regex = new RegExp(searchInput, 'gi');
    return country.name.match(regex);
  });

  // country array elements converted to HTML list elements
  // displayed as search result list
  const rows = () =>
    countriesToList.map(country => (
      <Country
        key={country.id}
        country={country}
        setDisplay={setCurrentDisplay}
        setCapital={setSelectedCapital}
      />
    ));

  // one effect - country data fetched from REST API
  // done once at the beginning
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all') //
      .then(response => {
        const countries = response.data;
        countries.forEach((country, index) => {
          country.id = index;
        });
        setCountries(countries);
      });
  };
  useEffect(hook, []); // data-fetching here is a side-effect
  // the Effect Hook prevents continuous fetching of data
  // [] - effect only run with 1st render

  // updating weather
  // data from axipu API - retrieved with each selected country change
  useEffect(() => {
    if (selectedCapital) {
      axios
        .get(
          `https://api.apixu.com/v1/current.json?key=ce46b298d82a44ad99f135419190807&q=${selectedCapital}`
        )
        .then(response => {
          setTemperature(response.data.current.temp_c);
          setIcon(response.data.current.condition.icon);
          setWind(response.data.current.wind_kph);
          setwindDirection(response.data.current.wind_dir);
        });
    }
  }, [selectedCapital]); // only re-renders when capital changes

  // controlling search input
  const handleSearchChange = e => {
    // clear current display
    setCurrentDisplay('');
    // update state
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    rows();
    if (countriesToList.length > 10) {
      setoneOrMore(false);
      setCurrentDisplay('Too many matches, specify another filter');
    } else if (countriesToList.length === 1) {
      setoneOrMore(true);
      setSelectedCapital(countriesToList[0].capital);
      setCurrentDisplay(<BasicData country={countriesToList[0]} />);
    } else {
      setoneOrMore(true);
      setCurrentDisplay(rows());
    }
  }, [searchInput, oneOrMore]);

  return (
    <div>
      <Filter input={searchInput} newSearch={handleSearchChange} />
      {currentDisplay}
      {{ oneOrMore } ? (
        <WeatherInfo
          selectedCapital={selectedCapital}
          temperature={temperature}
          icon={icon}
          wind={wind}
          windDirection={windDirection}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
