import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import Menu from './components/Menu';
import SingleWord from './pages/SingleWord';
import SingleManager from './pages/SingleManager';
import ManageWords from './pages/ManageWords';
import ManageManagers from './pages/ManageManagers';
import EditWord from './pages/EditWord';

function App() {
  return (
    <>
    <Menu />
      <Routes>
        <Route path='/' element={ <MainPage/> }/>
        <Route path='/manage/words' element={ <ManageWords/> }/>
        <Route path='/manage/managers' element={ <ManageManagers/> }/>
        <Route path='/word/:wordId' element={ <SingleWord /> }/>
        <Route path='/manager/:ManagerId' element={ <SingleManager /> }/>
        <Route path='/manage/edit-word/:wordId' element={ <EditWord/> }/>

        <Route path='/*' element={ <div>Page not found</div> }/>
      </Routes>
    </>
  )
}

export default App

