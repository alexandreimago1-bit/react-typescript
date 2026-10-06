import { useState } from 'react'
const HeaderDisplay = ({ text }) => {
  return(
    <h1>{text}</h1>
  )
}

const Input = ({ value, onChange }) => (
  <div>
    <input value={value} onChange={onChange} />
  </div>
)

const TextDisplay = ({text}) => {
  return(<p>{text}</p>)
}

const Button = ({ type, text })=>{
  return(<div>
    <button type={type}>{text}</button>
  </div>)
}

const PersonForm = ({onSubmit, newNameValue, newNameOnChange, newNumberValue, newNumberOnChange}) =>{
  return(
    <form onSubmit={onSubmit}>
      <TextDisplay text='Name:'/>
      <Input value={newNameValue} onChange={newNameOnChange}/>
      <TextDisplay text='Number:'/>
      <Input value={newNumberValue} onChange={newNumberOnChange}/>
      <Button type='submit' text='add'/>
    </form>
  )
}
const Person = ({person}) =>{
  return(
    <p>{person.name} - {person.number}</p>
  )
}

const Persons = ({personsToShow}) => {
  return(
    <div>
        {personsToShow.map(person => 
        <Person person={person} key={person.id}/>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: '1' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: '2' },
    { name: 'Dan Abramov', number: '12-43-234345', id: '3' },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: '4' }
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
      <HeaderDisplay text ='Phonebook' />
      <div>
        <TextDisplay text='filter shown with:'/> 
        <Input value={filterSearch} onChange={handleFilter} />
      </div>
      <HeaderDisplay text ='Add a Person' />
      <PersonForm 
      onSubmit={addPerson} 
      newNameValue={newName} 
      newNameOnChange={handleNewName}  
      newNumberValue={newNumber} 
      newNumberOnChange={handleNewNumber}/>
      <HeaderDisplay text ='Numbers' />
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}
export default App