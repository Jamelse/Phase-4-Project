import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(){

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  function handleChange(e) {
    const key = e.target.name
    setLoginData({
      ...loginData,
      [key]: e.target.value
    });
  };

  return (
    <div>
    <form>
    <div>
      <label>Email: </label>
      <input type="email"  name="email" value={loginData.email} onChange={handleChange} />
    </div>
    <div>
      <label>Password: </label>
      <input type="password" name="password" value={loginData.password} onChange={handleChange} />
    </div>
    <button type="submit">Login</button>
  </form>
  <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p> 
  </div>
  );
}

export default Login