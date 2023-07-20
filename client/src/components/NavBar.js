import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserProvider';

function NavBar(){
  const {user, setUser} = useContext(UserContext);
  const [dropDown, setDropDown] = useState(false);
  
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok){
        setUser(null);
      }
    });
  };

  return(
    <div className='navDiv'> 
      <ul>
        <li className='appTitle'><NavLink className='appNavTitle' to="/">{`BudgetBud[:`}</NavLink></li>
        <li>
          <p className="navUserName" onClick={() => setDropDown(!dropDown)}>{user.first_name}  { !dropDown ? <span>&#x25BE;</span> : <span>&#x25b4;</span>}</p>
          { dropDown ? <ul className="dropdown">
            <li className='dropDownList'><NavLink to='/profile/edit' className='dropDownItems'>Edit Profile</NavLink></li>
            <li className='dropDownList'><NavLink onClick={handleLogout} to='/login' className='dropDownItems'>Logout</NavLink></li>
          </ul> : null}
        </li>
      </ul>
    </div>
  )
}

export default NavBar