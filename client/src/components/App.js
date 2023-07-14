import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';
import EditUserProfileForm from './forms/EditUserProfileForm';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

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
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path='/' element={ <Home user={currentUser} setUser={setCurrentUser}/> }></Route>
        <Route path='/profile/edit' element={ <EditUserProfileForm /> }></Route>
      </Routes>
      
    </div>
  );
}

export default App;
