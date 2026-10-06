import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const  [filterSearch, setFilterSearch] = useState('')

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
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterSearch(event.target.value)
  }

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filterSearch.toLowerCase())
  })

  return(
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: 
        <input 
        value={filterSearch}
        onChange={handleFilter}
        />
      </div>
      <form onSubmit={addPerson}>
        <h2>Add Persons</h2>
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
      {personsToShow.map(person => 
        <p key={person.id}>{person.name} - {person.number}</p>
      )}
    </div>
    
  )
}
export default App