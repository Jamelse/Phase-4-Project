import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserProvider";

function EditUserProfileForm(){
  const {user, setUser} = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(user);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleEditUserProfileSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then(updatedUser => {setUser(updatedUser)
        navigate("/")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  }

  function handleChange(e) {
    const key = e.target.name
    setUserInfo({
      ...userInfo,
      [key]: e.target.value
    });
  };

  return(
    <div className="editUserProfileContainer">
      <div className="editUserProfileContent">
      <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage"><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div>
      <form className="editForm" onSubmit={handleEditUserProfileSubmit}>
      <div>
        <label>Email: <input className="formInput" type="email"  name="email"  autoComplete="off" value={userInfo.email} onChange={handleChange}/></label>  
      </div>
      <div>
        <label>First Name: <input className="formInput" type="text" name="first_name" autoComplete="off" value={userInfo.first_name} onChange={handleChange}/></label>     
      </div>
      <div>
        <label>Last Name: <input className="formInput" type="text" name="last_name" value={userInfo.last_name} onChange={handleChange}/></label> 
      </div>
      <button type="submit">Submit</button>
      </form>
      <button className="cancelButton" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}

export default EditUserProfileForm