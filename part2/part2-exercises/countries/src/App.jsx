import { useState,useEffect } from "react";
import axios from "axios";

const App = () => {
  const [filterSearch, setFilterSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectCountry, setSelectCountry] = useState('')

  useEffect(() =>{
    console.log('effect')
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(initialCountries => {
      console.log('promise fulfilled')
      setCountries(initialCountries.data)
    })
  } ,[])
  const handleSetSearch = (event) => {
    console.log(event.target.value)
    setFilterSearch(event.target.value)
  }
  const handleSelectCountry = (cca3) =>{
    console.log(cca3)
    setSelectCountry(cca3)
  }
const countriesToShow = countries.filter(country =>
  country.name.common.toLowerCase().includes(filterSearch.toLowerCase())
)

let content

if (countriesToShow.length > 10) {
  content = <p>Too many matches, specify another filter.</p>
} else if (countriesToShow.length > 1) {
  content = countriesToShow.map(country => (
    <div key={country.cca3}>{country.name.common}
    <button  onClick={()=>{handleSelectCountry(country.cca3)}}>Show</button>
    {selectCountry === country.cca3 && (
          <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          (<div>
            <li key={language}>{language}</li>
          </div>)
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div> 
    )}
    </div>
  ))
} else if (countriesToShow.length === 0) {
  content = ''
}else if (countriesToShow.length === 1){
  let country = countriesToShow[0]
  content =     
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          (<div>
            <li key={language}>{language}</li>
          </div>)
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div> 
}

  return (
    <div>
      <h1>
        Countries
      </h1>
        <label htmlFor="countryInput">find countries</label>
        <input type="text" id="countryInput" value={filterSearch} onChange={handleSetSearch}/>
        <div>
          {content}
        </div>
    </div>
  )
}
export default App