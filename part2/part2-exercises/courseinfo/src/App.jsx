const Part = ({ part }) =>{
  return(
    <li>{part.name} {part.exercises}</li>
  )
}

const Content = ({ course }) => {
  return(
    <div>
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
         )}
      </ul>
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course}/>
      <Content course = {course}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} parts={course.parts} />
}

export default App