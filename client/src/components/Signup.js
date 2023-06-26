import React, { useState } from 'react';

function SignUpForm(){
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  function handleChange(e) {
    const key = e.target.name
    setSignUpData({
      ...signUpData,
      [key]: e.target.value
    });
  };


  function handleSubmit(e){
    e.preventDefault();
  };
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name: </label>
        <input type="text" name="first_name" value={signUpData.first_name} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name: </label>
        <input type="text" name="last_name" value={signUpData.last_name} onChange={handleChange} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email"  name="email" value={signUpData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" name="password" value={signUpData.password} onChange={handleChange} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;