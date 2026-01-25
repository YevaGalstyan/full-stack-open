import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phonebookService from './services/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    phonebookService.getAll().then(persons => setPersons(persons))
  }, [])

  const handleAddName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (newNumber === existingPerson.number) {
        alert(`${newName} is already added to phonebook with the same phone number`);
        return;
      }
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`);
      
        if (confirm) {
        phonebookService.update(existingPerson.id, nameObject).then(returnedPerson => {
          const newPersons = persons.map(person => person.id === existingPerson.id ? returnedPerson : person)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
        })
      }
      return;
    }

    phonebookService.create(nameObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDelete = (name) => {
    const confirm = window.confirm(`Delete ${name} ?`)
    const person = persons.find(p => p.name === name)
    if (confirm) {
      phonebookService.deletePerson(person.id).then(() => {
        const newPersons = persons.filter(p => p.name !== name)
        setPersons(newPersons)
      })
    }
  }

  const handleSearch = (event) => {
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm
        addName={handleAddName}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)} />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        onDelete={handleDelete} />
    </div>
  )
}

export default App