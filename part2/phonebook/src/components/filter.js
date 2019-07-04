import React from 'react';

const Filter = ({ input, newSearch }) => {
  return (
    <div>
      filter displayed by{' '}
      <input
        value={input} //
        onChange={newSearch}
      />
    </div>
  );
};

export default Filter;
