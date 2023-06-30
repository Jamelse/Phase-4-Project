import React, { useState } from "react";
import NewExpenseForm from "./forms/NewExpenseForm";


function Home({ user, expenses }){
  const [userExpenses, setUserExpenses] = useState(expenses);
  
  function handleSetUserExpenses(expense){
    setUserExpenses([...userExpenses, expense])
  }

  console.log(userExpenses)
return (
 <div>
  <NewExpenseForm user={user} handleSetUserExpenses={handleSetUserExpenses}/>
  {userExpenses.map((expense) => {
    return (
      <div key={expense.id}>
        <p >{expense.name}</p>
      </div>
    )
  })}
  </div>
  )
}

export default Home