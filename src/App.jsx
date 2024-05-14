import './App.css'
import { Route, Routes } from 'react-router-dom'
import Details from './components/Details'
import CheckDetails from './components/CheckDetails'
import DashboardDetails from './components/DashboardDetails'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Details/>}/>
      <Route path='check' element={<CheckDetails/>}/>
      <Route path='/dashboard' element={<DashboardDetails/>}/>
    </Routes>
    </>
  )
}

export default App
