// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import Menu from './components/Menu';
import SingleAthlete from './pages/SingleAthlete';
import EditAthlete from './pages/EditAthlete';
import EditResult from './pages/EditResult';

function App() {
  // const [count, setCount] = useState(0)

  

  return (
    <>
        <Menu />

        <Routes>
          <Route path="/" element={ <MainPage /> } />
          <Route path="/athletes" element={ <Athletes /> } />
          <Route path="/athlete/:athleteId" element={ <SingleAthlete /> } />
          <Route path="/edit-athlete/:athleteId" element={ <EditAthlete /> } />
          <Route path="/results" element={ <Results /> } />
          <Route path="/edit-result/:resultId" element={<EditResult />} />
        </Routes>
    </>
  )
}

export default App