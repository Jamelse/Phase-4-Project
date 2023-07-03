import React, { useState, useEffect } from "react";
import NewExpenseForm from "./forms/NewExpenseForm";
import BudgetBreakdown from "./BudgetBreakdown";


function Home({ user, expenses }){
  const [userExpenses, setUserExpenses] = useState(expenses);
  const [categories, setCategories] = useState([]);
  const [newExpense, setNewExpense] = useState(false)
  function handleSetUserExpenses(expense){
    setUserExpenses([...userExpenses, expense])
  }

  useEffect(() => {
    fetch('/categories')
    .then(r => r.json())
    .then(category => setCategories(category))
  }, []);


  console.log(categories.map((cat) => cat.total_expense_cost))


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
        <NewExpenseForm user={user} handleSetUserExpenses={handleSetUserExpenses} setNewExpense={setNewExpense} categories={categories}/>
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
      
      <BudgetBreakdown categories={categories}/>
    </div>
    <h3>Remaining:</h3>
    <p>{user.income - categories.map((cat) => cat.total_expense_cost).reduce((a, b)=> a + b)}</p>
  </div>
</div>
  )
}

export default Home