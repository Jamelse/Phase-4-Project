import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import Home from './Home';
import EditUserProfileForm from './forms/EditUserProfileForm';
import { UserContext } from './UserProvider';

function App() {
  const {user} = useContext(UserContext)
  
  if (!user) return <Login/>;
  
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={ <Home/> }></Route>
        <Route path='/profile/edit' element={ <EditUserProfileForm/> }></Route>
      </Routes>
      
    </div>
  );
}

export default App;
