import { useState } from "react"; 

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ onClick,text }) => <button onClick={onClick}> {text} </button>


const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('this renders with counter value', counter);
  const addOne = () =>{
      console.log('this increases the value before', counter)
      setCounter(counter + 1)
  } 

  const subtractOne = () => {
      console.log('this decreases the value before',counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
      console.log('this resets the value before to zero', counter)
    setCounter(0)
  }



  return(
    <div>
    <Display counter = {counter}/>
    <Button onClick={addOne} text = "Plus"/>
    <Button onClick={subtractOne} text = "Minus"/>
    <Button onClick={setToZero} text = "Zero"/>
    </div>
  )
}

export default App