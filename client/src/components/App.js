import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import SignUpForm from './Signup';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUpForm />}></Route>
        <Route path='/home' element={ <Home />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
