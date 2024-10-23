import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Body from './components/Body'
import Login from './components/Login'
import Feed from './components/Feed'

import { store } from './redux/appStore'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/login' element={<Login />} />
              <Route path='/feed' element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
