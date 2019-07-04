import React, { useState } from 'react';
import Person from './components/person';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';

const App = () => {
  // application state pieces
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '040-123456'
    },
    {
      id: 2,
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      id: 3,
      name: 'Dan Abramov',
      number: '12-43-234345'
    },
    {
      id: 4,
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // filtering persons based on user search input
  const personsToList = persons.filter(person => {
    const regex = new RegExp(searchInput, 'gi');
    return person.name.match(regex);
  });

  // persons list objects converted to HTML list elements
  const rows = () =>
    personsToList.map(person => (
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
      // case insensitive comparison
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
      name: newName,
      number: newNumber
    };
    // concat() create a new array in which content of old array
    // and the new item are both included
    setPersons(persons.concat(person));
  };

  // controlling input through state
  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={searchInput} newSearch={handleSearchChange} />
      <h2>Add New</h2>
      <PersonForm
        newContact={addContact} //
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons rows={rows()} />
      <ul>{rows()}</ul>
    </div>
  );
};

export default App;
