import React, { useState } from "react";
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignupForm';

function Login({onLogin}){
  const [hasAccount, setHasAccount] = useState(true)
  return (
    <div>
    { hasAccount ? 
     <div>
      <LoginForm onLogin={onLogin} />
      <p>Don't have an account? <button onClick={() => setHasAccount(false)}>Sign Up</button></p> 
     </div>
    : <div> 
      <SignUpForm onLogin={onLogin} /> 
      <p>Already have an account? <button onClick={() => setHasAccount(true)}>Log In</button></p> 
      </div>}
    </div>
  )
}

export default Login