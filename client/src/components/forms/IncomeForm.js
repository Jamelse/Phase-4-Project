import React, { useState } from "react";

function IncomeForm({ setEditIncome, user, setUser }){
  const [incomeData, setIncomeData] = useState(user.income);
  const [errors, setErrors] = useState([]);

  function onIncomeSubmit(e){
    e.preventDefault();
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
      <form onSubmit={onIncomeSubmit} className="editForm" >
    <div>
      <label>Edit Income: <input className="formInput" name="income" value={incomeData} onChange={(e) => setIncomeData(e.target.value)} /></label> 
    </div>
    <button type="submit">Submit</button>
  </form>
  <button onClick={() => setEditIncome(false)}>Cancel</button>
    </div>
  );
}

export default IncomeForm