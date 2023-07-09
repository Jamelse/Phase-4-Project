import React, { useState, useEffect } from "react";
import NewExpenseForm from "./forms/NewExpenseForm";
import BudgetBreakdown from "./BudgetBreakdown";
import IncomeForm from "./forms/IncomeForm";


function Home({ user, setUser }){
  const [userExpenses, setUserExpenses] = useState(user.expenses);
  const [categories, setCategories] = useState(null);
  const [newExpense, setNewExpense] = useState(false);
  const [editIncome, setEditIncome] = useState(false)

  useEffect(() => {
    fetch('/categories')
    .then(r => r.json())
    .then(category => setCategories(category))
  }, []);

  function handleSetUserExpenses(expense){
    const newE = categories.find(cat => cat.id === expense.category.id);
    const updatedExpense = newE.total_expense_cost += expense.amount
    setCategories([...categories, updatedExpense])
    setUserExpenses([...userExpenses, expense])
  };
    
  if (!categories) return <h1>Loading...</h1>

return (
 <div className="homeContentDiv">
  <div>
    <h2>Hello, {user.first_name} {user.last_name}</h2>
  </div>
  <div className="mainBudgetDiv">
    <div className="contentWrap">
      <div className="incomeAndExpensesContentWrap">
        <div className="incomeAndExpensesContent">
          <div className="incomeContent">
            <h2 className="incomeTitle">Income:</h2>
            { !editIncome ?
            <div>
              <p>{`$${user.income}`}</p>
              <button onClick={() => setEditIncome(true)}>Edit</button>
            </div> 
             : <IncomeForm setEditIncome={setEditIncome} user={user} setUser={setUser}/>}  
          </div>
          <div className="expenseContent">
            <h2 className="expenseTitle">Expenses:</h2>
            { newExpense ? 
            <>
              <NewExpenseForm user={user} handleSetUserExpenses={handleSetUserExpenses} setNewExpense={setNewExpense} categories={categories} />
            </>
            :<div>
              {userExpenses.map((expense) => {
                return (
                  <div key={expense.id}>
                    <p><button className="material-icons">edit</button> {expense.name}</p>
                    
                  </div>
              )})}
                <button onClick={() => setNewExpense(true)}>Add New Expense</button>
              </div>}
            </div>
          </div>
        </div>
      <div className="budgetBreakdownWrap">  
        <BudgetBreakdown categories={categories}/>
      </div>
    </div>
    <h3>Remaining:</h3>
    <p>${user.income - userExpenses.map((expense) => expense.amount).reduce((a, b)=> a + b)}</p>
  </div>
</div>
  )
}

export default Home