import React from 'react';

const Languages = ({ rows }) => {
  return (
    <div>
      <ul>{rows()}</ul>
    </div>
  );
};

const Language = ({ language }) => {
  return <li>{language.name}</li>;
};

const BasicData = ({ country }) => {
  country.languages.map((language, index) => (language.id = index));

  const languages = () =>
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
      <Languages rows={languages} />
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
