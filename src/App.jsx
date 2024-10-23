import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import './App.css'

import Body from './pages/Body'
import Login from './pages/Login'
import Feed from './pages/Feed'

import { store } from './redux/appStore'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
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
