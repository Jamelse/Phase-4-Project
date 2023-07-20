import React, { useState, useContext } from "react";
import { UserContext } from "../UserProvider";

function IncomeForm({ setEditIncome }){
  const {user, setUser} = useContext(UserContext);
  const [incomeData, setIncomeData] = useState(user.income);
  const [errors, setErrors] = useState([]);

  function onIncomeSubmit(e){
    e.preventDefault();
    setErrors([]);
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        income: Number(incomeData)
      }),
    })
    .then((r) => {
      if (r.ok){
        r.json()
        .then((updatedUser) => { 
          setUser(updatedUser);
        setEditIncome(false);})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  };

  return (
    <div>
      <div className="errorsDiv">
      {errors.map(error => {
        return (
         <p className="errorMessage"><span className="material-icons">priority_high</span>{error}</p>
        )
      })}
    </div>
      <form onSubmit={onIncomeSubmit} className="editForm" >
    <div>
      <label>Edit Income: <input className="formInput" name="income" value={incomeData} onChange={(e) => setIncomeData(e.target.value)} /></label> 
    </div>
    <button type="submit">Submit</button>
  </form>
  <button className="incomeCancelButton" onClick={() => setEditIncome(false)}>Cancel</button>
    </div>
  );
}

export default IncomeForm