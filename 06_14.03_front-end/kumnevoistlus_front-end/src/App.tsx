import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Athlete } from './models/Athletes'; // models kasutas olevad failid "Athletes" ja "Results"
import { Result } from './models/Results';

function App() {
  // const [count, setCount] = useState(0)

  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  //Andmete fetchimine
  useEffect(() => {
    fetch("http://localhost:8080/athletes")
        .then(res=>res.json())
        .then(json=> setAthletes(json))
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/results")
        .then(res=>res.json())
        .then(json=> setResults(json))
  }, []);

  //Tagastavad väärtused
  return (
    <>
      {athletes.map(athlete =>
        <div key={athlete.id}>
          <div>{athlete.name}</div>
          <div>{athlete.country}</div>
          <div>{athlete.age}</div>
          <div>{athlete.totalPoints}</div>
        </div>
      )}
      <br />
      <br />
      {results.map(result =>
        <div key={result.id}>
          <div>{result.athlete.name}</div>
          <div>{result.event}</div>
          <div>{result.score}</div>
          <div>{result.points}</div>
        </div>
      )}
    </>
  )
}

export default App