import React from 'react'
import { NavLink } from 'react-router-dom';

function NavBar({ setCurrentUser }){

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok){
        setCurrentUser(null);
      }
    });
  }

  return(
    <div className='navDiv'> 
      <nav>
        <a>hi</a>
        <NavLink onClick={handleLogout} to='/login'>Logout</NavLink>
      </nav>
    </div>
  )
}

export default NavBar