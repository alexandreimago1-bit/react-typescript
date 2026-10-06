import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: '1'
     }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const match = persons.some( person => person.name === newName)
    if (match){
      alert(`${newName} is already added to phonebook`)
    }else if (newName.trim() === ''){
      alert(`Your input is empty`)
    } else{
      const personsObject = {
      name: newName,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(personsObject))
    }
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.id}>{person.name}</p>
      )}
    </div>
    
  )
}
export default App