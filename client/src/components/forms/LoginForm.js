import React, { useState } from 'react'

function LoginForm({ onLogin }){

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

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
  </div>
  );
}

export default LoginForm