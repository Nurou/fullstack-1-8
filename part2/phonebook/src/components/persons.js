import React from 'react';

const Persons = ({ rows }) => {
  return (
    <div>
      <ul>{rows()}</ul>
    </div>
  );
};

export default Persons;
