import React, { useState } from 'react';
import Person from './components/person';

/* NB:

you can use the person's name as value of the key property
remember to prevent the default action of submitting HTML forms!

*/

const App = () => {
  // newName meant for controlling the form input element.
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  // function to display the list of contacts
  const rows = () =>
    persons.map(person => (
      <Person
        key={person.id} //
        person={person}
      />
    ));

  const addContact = e => {
    // prevent refresh on submit
    e.preventDefault();

    let isAdreadyAdded = false;

    persons.forEach(person => {
      const existingName = person.name.toUpperCase();
      const personToAdd = newName.toUpperCase();
      if (existingName.includes(personToAdd)) {
        alert(`${newName} has already been added to the phonebook`);
        isAdreadyAdded = true;
      }
    });

    // new persons can't be added
    if (isAdreadyAdded) {
      return;
    }

    // create new person object
    const person = {
      id: persons.length + 1,
      name: newName
    };
    // concat() create a new array in which content of old array
    // and the new item are both included
    setPersons(persons.concat(person));
  };

  // controlling input through state
  const handlePBchange = e => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name:{' '}
          <input
            value={newName} //
            onChange={handlePBchange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{rows()}</ul>
    </div>
  );
};

export default App;
