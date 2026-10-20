import axios from "axios";

const countryURL = 'https://studies.cs.helsinki.fi/restcountries/api/all' 

const getAll= () => {
    return(axios
    .get(countryURL)
    .then(response => {return(response.data)}))
}


export default {
    getAll
}