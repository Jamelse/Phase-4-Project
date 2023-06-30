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
    <div>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default LoginForm