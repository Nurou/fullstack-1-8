import React from 'react';

const WeatherInfo = ({
  selectedCapital,
  temperature,
  icon,
  wind,
  windDirection
}) => {
  if (selectedCapital) {
    return (
      <div>
        <h2>Weather in {selectedCapital}</h2>
        <strong>temperature:</strong> {temperature} Celsius
        <br />
        <img src={icon} alt="weather icon" />
        <br />
        <strong>wind:</strong> {wind} kph direction {windDirection}
      </div>
    );
  } else {
    return <div />;
  }
};

export default WeatherInfo;
