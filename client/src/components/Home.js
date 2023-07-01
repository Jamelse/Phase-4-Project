import React, { useState } from "react";
import NewExpenseForm from "./forms/NewExpenseForm";


function Home({ user, expenses }){
  const [userExpenses, setUserExpenses] = useState(expenses);
  const [newExpense, setNewExpense] = useState(false)
  function handleSetUserExpenses(expense){
    setUserExpenses([...userExpenses, expense])
  }

  console.log(userExpenses)


return (
 <div>
  <div>
    <h2>Hello, {user.first_name} {user.last_name}</h2>
  </div>
  <div>
    <div>
      <h3>Income:</h3>
      <p>{`$${user.income}`}</p>
      { newExpense ? 
      <div>
        <NewExpenseForm user={user} handleSetUserExpenses={handleSetUserExpenses} setNewExpense={setNewExpense}/>
      </div>
      :<div>
      <h3>Expenses:</h3>
      {userExpenses.map((expense) => {
      return (
        <div key={expense.id}>
          <p >{expense.name}</p>
        </div>
      )})}
        <button onClick={() => setNewExpense(true)}>Add New Expense</button>
      </div>}
    </div>
    <div>
      <h3>Budget Breakdown:</h3>
      <p>For : {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()}</p>
    </div>
    <h3>Remaining:</h3>
  </div>
</div>
  )
}

export default Home