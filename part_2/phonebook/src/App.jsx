import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleAddName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} />
    </div>
  )
}

export default App