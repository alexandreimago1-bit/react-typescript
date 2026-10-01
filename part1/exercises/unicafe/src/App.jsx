import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const StatKeep = (props) => {
  return(
    <p>{props.text}: {props.state}</p>
  );
}



const App = () => {
  // save clicks of each button to its own state
const [good,setGood] = useState(0)
const [neutral,setNeutral] = useState(0)
const [bad,setBad] = useState(0)

const title = "Give Feedback"


// event handlers
const addGood = () => {
  console.log('good before',good)
  setGood(good + 1)
  console.log('good after',good)
}
const addBad = () => {
  console.log('bad before',bad)
  setBad(bad + 1)
  console.log('bad after',bad)
}
const addNeutral = () => {
  console.log('neutral before',neutral);
  setNeutral(neutral + 1)
  console.log('neutral after',neutral);
}

return(
<div>
  <Header title={title}/>
  <Button onClick={addGood} text = 'Good'/>
  <Button onClick={addBad} text = 'Bad'/>
  <Button onClick={addNeutral} text = 'Neutral'/>
  <Header title='Statistics' />
  <StatKeep text ='Good' state={good}/>
  <StatKeep text ='Bad' state={bad}/>
  <StatKeep text ='Neutral' state={neutral}/>
</div>
);

}

export default App