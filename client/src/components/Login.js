import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignupForm';

function Login({onLogin}){
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="loginSignUpPage">
    { hasAccount ? 
     <div className="loginSignUpContent">
      <h1 className="budgetBudETitle">{`BudgetBUD[:`}</h1>
      <LoginForm onLogin={onLogin} />
      <p>Don't have an account? <button onClick={() => {setHasAccount(false); navigate("/signup")}}>Sign Up</button></p> 
     </div>
    : <div className="loginSignUpContent"> 
      <h1 className="budgetBudETitle">{`BudgetBUD[:`}</h1>
      <SignUpForm onLogin={onLogin} /> 
      <p>Already have an account? <button onClick={() => {setHasAccount(true); navigate("/login")}}>Log In</button></p> 
      </div>}
    </div>
  )
}

export default Login