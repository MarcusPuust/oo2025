// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import Menu from './components/Menu';

function App() {
  // const [count, setCount] = useState(0)

  

  return (
    <>
        <Menu />

        <Routes>
          <Route path="/" element={ <MainPage /> } />
          <Route path="/athletes" element={ <Athletes /> } />
          <Route path="/results" element={ <Results /> } />
        </Routes>
    </>
  )
}

export default App