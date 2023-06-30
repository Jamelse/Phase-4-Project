import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm({ onLogin }){
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    income: 0
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    const key = e.target.name
    setSignUpData({
      ...signUpData,
      [key]: e.target.value
    });
  };


  function handleSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    }).then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {onLogin(user)
          navigate("/")});
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });
  };

  console.log(errors)
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: </label>
        <input type="email"  name="email" value={signUpData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" name="password" value={signUpData.password} onChange={handleChange} />
      </div>
      <div>
        <label>Confirm Password: </label>
        <input type="password" name="password_confirmation" value={signUpData.password_confirmation} onChange={handleChange} />
      </div>
      <div>
        <label>First Name: </label>
        <input type="text" name="first_name" value={signUpData.first_name} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name: </label>
        <input type="text" name="last_name" value={signUpData.last_name} onChange={handleChange} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;