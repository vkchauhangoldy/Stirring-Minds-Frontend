import React from 'react'
import Protected from './components/utils/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import Home from './components/home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/homepage' element={<Protected><Home /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
