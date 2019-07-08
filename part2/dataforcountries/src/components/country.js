import React from 'react';
import BasicData from './basicData';

const Country = ({ country, setDisplay, setCapital }) => {
  const handleClick = () => {
    //TODO: Refactor this
    setDisplay(<BasicData country={country} />);
    setCapital(country.capital);
  };
  return (
    <div>
      {country.name} {''}
      <button onClick={handleClick}>show</button>
    </div>
  );
};

export default Country;
