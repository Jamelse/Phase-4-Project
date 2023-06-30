import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userExpenses, setUserExpenses] = useState([]);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {setCurrentUser(user)
        setUserExpenses(user.expenses)});
      }
    });
  }, []);

  function handleSetUserExpenses(expense){
    setUserExpenses([...userExpenses, expense])
  }

  if (!currentUser) return <Login onLogin={setCurrentUser} />;

  return (
    <div className="App">
      <NavBar setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path='/' element={ <Home user={currentUser} expenses={userExpenses} setUserExpenses={handleSetUserExpenses}/> }></Route>
      </Routes>
      
    </div>
  );
}

export default App;
