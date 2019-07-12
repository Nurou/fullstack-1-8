import React, { useState, useEffect } from 'react';
import Person from './components/person';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import personsService from './services/persons';

const App = () => {
  // application state pieces
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // initial phonebook retrieval
  useEffect(() => {
    personsService.getAll().then(initialNotes => setPersons(initialNotes));
  }, []);

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
        deleteEntry={deleteEntry}
      />
    ));

  /**
    |--------------------------------------------------
    | - adding a contact
    | - if contact already exists perform number update
    |--------------------------------------------------
    */

  const addContact = e => {
    // prevent refresh on submit
    e.preventDefault();

    // flags
    let isAdreadyAdded = false;
    let confirmed = true;
    let existingPerson = '';

    persons.forEach(person => {
      // case insensitive comparison
      const existingName = person.name.toUpperCase();
      const personToAdd = newName.toUpperCase();

      // person already on the books?
      if (existingName === personToAdd) {
        existingPerson = person;
        isAdreadyAdded = true;
      }
    });

    if (isAdreadyAdded) {
      // want to update number?
      confirmed = window.confirm(`${newName} has already been added to the phonebook,
         replace the old number with a new one?`);
      if (confirmed) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        };
        personsService
          .update(existingPerson.id, updatedPerson) //
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
          });
      }
    }

    // create new person object
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    };

    // create note in db & render returned note
    personsService
      .create(newPerson) //
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
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

  // deleting a person
  const deleteEntry = id => {
    const personToDelete = persons.find(person => person.id === id);
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);
    if (confirmDelete) {
      personsService.remove(id);
      setPersons(persons.filter(person => person.id !== id));
    }
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
