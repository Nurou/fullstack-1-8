import React from 'react';

// renders the list of languages
const Languages = ({ rows }) => {
  return (
    <div>
      <ul>{rows()}</ul>
    </div>
  );
};

// returns an individual language
const Language = ({ language }) => {
  return <li>{language.name}</li>;
};

// the actual component - displays country info
const BasicData = ({ country }) => {
  // add key's to each language
  country.languages.map((language, index) => (language.id = index));

  // map each langiage to a HTML list element
  const rows = () =>
    country.languages.map(language => (
      <Language key={language.id} language={language} />
    ));

  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br />
      population {country.population}
      <h2>languages</h2>
      <Languages rows={rows} />
      <img
        src={country.flag}
        alt="country flag"
        width={200}
        height={150}
        node="fit"
      />
    </div>
  );
};

export default BasicData;
