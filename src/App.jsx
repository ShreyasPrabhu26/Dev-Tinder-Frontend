import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Login from './components/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login />} />
            <Route path='/test' element={<div>Test</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
