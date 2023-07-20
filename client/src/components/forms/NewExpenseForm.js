import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewExpenseForm({ user, handleSetUserExpenses, categories }){
  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: 0,
    date: '',
    category_id: 1,
    user_id: user.id
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  
  function handleChange(e) {
    const key = e.target.name
    setExpenseData({
      ...expenseData,
      [key]: e.target.value
    });
  };

  function handleExpenseSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch("/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then((expense) => { 
          handleSetUserExpenses(expense)
          navigate("/")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  };

  return (
  <div className="newExpenseFormDiv">
    <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage"><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div>
    <form className="editForm" onSubmit={handleExpenseSubmit}>
      <div>
      <label>Category: <select className="formInputSelect" name="category_id" onChange={handleChange}>
        {categories.map((cat) => {
          return (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          )
        })}
      </select></label>  
    </div>
    <div>
      <label>Name: <input className="formInput"  name="name" value={expenseData.name} onChange={handleChange} /></label> 
    </div>
    <div>
      <label>Amount: <input className="formInput" name="amount" value={expenseData.amount} onChange={handleChange} /></label>  
    </div>
    <div>
    <label>Paid On: <input className="formInput" type="date" name="date" value={expenseData.date} onChange={handleChange}/></label>  
    </div>
    <button type="submit">Create</button>
  </form>
  
</div>

)
}

export default NewExpenseForm