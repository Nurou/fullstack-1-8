import React from 'react';

const Filter = ({ input, newSearch }) => {
  return (
    <div>
      filter displayed numbers with{' '}
      <input
        value={input} //
        onChange={newSearch}
      />
    </div>
  );
};

export default Filter;
