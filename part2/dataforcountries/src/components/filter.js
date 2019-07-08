import React from 'react';

const Filter = ({ input, newSearch }) => {
  return (
    <div>
      find countries{' '}
      <input
        value={input} //
        onChange={newSearch}
      />
    </div>
  );
};

export default Filter;
