import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0917 123 4567',
      id: '1'
     }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const match = persons.some( person => person.name === newName)
    if (match){
      alert(`${newName} is already added to phonebook`)
    }else if (newName.trim() === ''){
      alert(`The name you entered is invalid`)
    } else if (newNumber.trim() === ''){
      alert(`The number you entered is invalid`)
    }else{
      const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: String(persons.length + 1)
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.id}>{person.name} - {person.number}</p>
      )}
    </div>
    
  )
}
export default App