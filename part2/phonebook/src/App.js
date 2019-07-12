import React, { useState, useEffect } from 'react';
import Person from './components/person';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import axios from 'axios';
import personsService from './services/persons';

// TODO: set up json server
// TODO: set up services (optional)
// TODO:
// TODO:

const App = () => {
  // application state pieces
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons') //
      .then(response => {
        setPersons(response.data);
      });
  };

  useEffect(hook, []);

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

    // store note in db & render returned note
    personsService.create(person).then(returnedPerson => {
      setPersons(persons.concat(person));
      // clear inputs
      setNewNumber('');
      setNewName('');
    });
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
      <Persons rows={rows} />
    </div>
  );
};

export default App;
