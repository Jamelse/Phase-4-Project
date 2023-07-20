import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }){
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    const key = e.target.name
    setLoginData({
      ...loginData,
      [key]: e.target.value
    });
  };

  function handleSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {onLogin(user)
        navigate("/")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors))
      }
    });
  }

  return (
    <div className='loginSignUpContainer'>
      <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage" key={error}><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: <input className="loginSignUpInput" type="email"  name="email" value={loginData.email} onChange={handleChange} autoComplete="off"/></label> 
        </div>
        <div>
          <label>Password: <input className="loginSignUpInput" type="password" name="password" value={loginData.password} onChange={handleChange} /></label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm