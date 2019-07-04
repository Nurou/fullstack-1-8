import React from 'react';

const person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

export default person;
