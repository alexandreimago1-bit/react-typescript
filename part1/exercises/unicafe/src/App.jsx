import { useState } from 'react'


const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}


const StatisticLine = ({text, value}) => {
  if(text == 'Positive'){
    return <p>{text}: {value}%</p>
  }else{
  return <p> {text}: {value}</p>
  }
}

const Statistics = ({good, neutral, bad,total, average, positive}) => {
if (total === 0){
  return(<p> As of Now there has been No feedback Given. </p>)
}else{
  return(
  <div>
    <StatisticLine text ='Good' value={good}/>
    <StatisticLine text ='Neutral' value={neutral}/>
    <StatisticLine text ='Bad' value={bad}/>
    <StatisticLine text='Total' value={total}/>
    <StatisticLine text='Average' value={average}/>
    <StatisticLine text='Positive' value={positive}/>
  </div>
  );
}
}

const App = () => {
  // save clicks of each button to its own state
const [good,setGood] = useState(0)
const [neutral,setNeutral] = useState(0)
const [bad,setBad] = useState(0)
// data
const total = good + bad + neutral
const positive = (good / total)*100
const average = total / 3

const title = "Give Feedback"


// event handlers
const addGood = () => {

  setGood(good + 1)

}
const addBad = () => {

  setBad(bad + 1)

}
const addNeutral = () => {

  setNeutral(neutral + 1)

}

return(
<div>
  <Header title={title}/>
  
  <Button onClick={addGood} text = 'Good'/>
  <Button onClick={addNeutral} text = 'Neutral'/>
  <Button onClick={addBad} text = 'Bad'/>

  <Header title='Statistics' />

  <Statistics good={good} bad={bad} neutral={neutral} total={total} positive={positive} average={average}/>

</div>
);

}

export default App