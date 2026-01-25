import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService.getAll().then(persons => setPersons(persons))
  }, [])

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleAddName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (newNumber === existingPerson.number) {
        showNotification(
          'warning',
          `${newName} is already added to phonebook with the same phone number`
        )
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
          showNotification('success', `Updated ${newName}`)
        }).catch(error => {
          showNotification('error', `Failed to update ${newName}: ${error.response.statusText}`)
        })
      }
      return;
    }

    phonebookService.create(nameObject).then(returnedPerson => {
      showNotification('success', `Added ${newName}`)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    }).catch(error => {
      console.log(error.response.data)
      showNotification('error', `Failed to add ${newName}: ${error.response.statusText}`)
    })
  }

  const handleDelete = (name) => {
    const confirm = window.confirm(`Delete ${name} ?`)
    const person = persons.find(p => p.name === name)
    if (confirm) {
      phonebookService.deletePerson(person.id).then(() => {
        showNotification('success', `Deleted ${name}`)
        const newPersons = persons.filter(p => p.name !== name)
        setPersons(newPersons)
      }).catch(error => {
        showNotification('error', `Failed to delete ${name}: ${error.response.statusText}`)
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
      {notification && <Notification message={notification.message} messageType={notification.type} />}
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