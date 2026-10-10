import { useState,useEffect } from 'react'
import axios from 'axios'
import personsService from './service/service'

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
const Person = ({person, handleDelete}) =>{
  return(
    <div>
      <p>{person.name} - {person.number}</p>
      <button onClick = {() => handleDelete(person.id) }>delete</button>
    </div>  
  )
}

const Persons = ({personsToShow, handleDelete}) => {
  return(
    <div>
        {personsToShow.map(person => 
        <Person person={person} key={person.id} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const  [filterSearch, setFilterSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  },[])

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
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
            setPersons(persons.concat(response.data))
            console.log('promise fulfilled', response.data)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() =>{
      return setPersons(prevPersons => prevPersons.filter(person => person.id !== id)) })
      .catch (error => {
        alert(`Failed to delete person: ${error.message}`)})
      
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}
export default App