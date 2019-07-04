import React from 'react';

const PersonForm = ({ newContact, name, number, nameChange, numberChange }) => {
  return (
    <form onSubmit={newContact}>
      <div>
        name:
        <input
          value={name} //
          onChange={nameChange}
        />
        <br />
        number:
        <input
          value={number} //
          onChange={numberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
