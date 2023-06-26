import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  if (!currentUser) return <Login onLogin={setCurrentUser} />;

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={ <Home/> }></Route>
      </Routes>
      
    </div>
  );
}

export default App;
