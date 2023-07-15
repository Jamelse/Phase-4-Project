import React, {useState} from "react";

function EditUserProfileForm(){
  return(
    <div className="editUserProfileContainer">
      <div className="editUserProfileContent">
      <form className="editForm">
      <div>
        <label>Email: <input className="formInput" type="email"  name="email"  autoComplete="off"/></label>  
      </div>
      <div>
        <label>First Name: <input className="formInput" type="text" name="first_name" autoComplete="off"/></label>     
      </div>
      <div>
        <label>Last Name: <input className="formInput" type="text" name="last_name"/></label> 
      </div>
      <button type="submit">Sign Up</button>
    </form>
      </div>
    </div>
  );
}

export default EditUserProfileForm