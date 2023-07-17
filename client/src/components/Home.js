import React, { useState, useEffect } from "react";
import NewExpenseForm from "./forms/NewExpenseForm";
import BudgetBreakdown from "./BudgetBreakdown";
import IncomeForm from "./forms/IncomeForm";

function Home({ user, setUser }){
  const [userExpenses, setUserExpenses] = useState(user.expenses);
  const [categories, setCategories] = useState(null);
  const [newExpense, setNewExpense] = useState(false);
  const [editIncome, setEditIncome] = useState(false);
  const [chartOptions, setChartOptions] = useState({
    options: { 
      labels: [],
      chart: {
        id: 1,
        width: '100%',
        type: 'pie',
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
        "#2b908f",
        "#f9a3a4",
        "#90ee7e",
        "#f48024",
        "#69d2e7",
        "#B39DDB"
      ],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        itemMargin: {
          horizontal: 5,
          vertical: 5
      },
      },
      stroke:{
        show: false,
        width: 0
       },
      noData: {
        text: "No data",
        align: "center",
        verticalAlign: "middle"
      },
      tooltip: {
        custom: ({ series, seriesIndex, w }) => {
          return (
            `<div class="arrow_box"> 
            <span>
            ${w.globals.labels[seriesIndex]}:
            $${series[seriesIndex]}
            </span>
            </div>`
          );
        }
      }},
    series: []
  });

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function updateChartOptions(category){
    const filteredCategories = category.filter(cat => cat.total_expense_cost > 0);
    setChartOptions({
      options: {
        labels: filteredCategories?.map((cat) => cat.name)
      },
      series: filteredCategories?.map((cat) => cat.total_expense_cost)
    });
  };
  
  useEffect(() => {
    fetch('/categories')
    .then(r => r.json())
    .then(category => { setCategories(category)
      updateChartOptions(category)})}, []);

  function handleSetUserExpenses(expense){
    const newE = categories.map((cat) => {
      if (cat.id === expense.category_id) {
        return {...cat, 
          total_expense_cost: Number(cat.total_expense_cost += expense.amount)};
      }
      return cat;
     });

    setCategories(newE); 
    updateChartOptions(newE);
    setUserExpenses([...userExpenses, expense]);
    setNewExpense(false);
  };

  function onDeletedExpense(expense){
    const removedE = categories.map((cat) => {
      if (cat.id === expense.category_id) {
        return {...cat, 
          total_expense_cost: Number(cat.total_expense_cost -= expense.amount)};
      }
      return cat;
     });
    
    setCategories(removedE); 
    setUserExpenses(userExpenses.filter(ex => ex.id !== expense.id));
    updateChartOptions(removedE);
  }

  function handleExpenseDelete(expense){
    fetch(`/expenses/${expense.id}`, {
      method: "DELETE"
    }).then((r) => {
      if (r.ok) {
        onDeletedExpense(expense)
      }
    })
  };

  function handleExpenseResetButton(){
    fetch("/reset", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok){
        setUserExpenses([]);
        setChartOptions({
          options: {
            ...chartOptions,
            labels: []
          },
          series: []
        })
      }
    });
  };


  function budgetBreakdownMessage(){
    const uExpenses = userExpenses.map((expense) => expense.amount).reduce((a, b)=> a + b, 0)
    if ( uExpenses === 0){
      return null
    } else if (user.income - uExpenses > 0){
      return(
        <p className="greenMessage"><span className="material-icons">check</span>Great! You're currently spending less than your total income!</p>
      );
    } else 
    return (
      <p className="redMessage"><span className="material-icons">priority_high</span> You're currently spending more than you earn!</p>
    )
  }
    
  if (!categories) return <h1 className="loading">Loading...</h1>

return (
 <div className="homeContentDiv">
  <div>
    <h2>Hello, {capitalizeFirstLetter(user.first_name)} {`${capitalizeFirstLetter(user.last_name)}!`}</h2>
  </div>
  <div className="mainBudgetDiv">
    <div className="contentWrap">
      <div className="incomeAndExpensesContentWrap">
        <div className="incomeAndExpensesContent">
          <div className="incomeContent">
            <h2 className="incomeTitle">Income:</h2>
            { !editIncome ?
            <div>
              <p className="userIncome">{`$${user.income}`}</p>
              <button onClick={() => setEditIncome(true)}>Edit</button>
            </div> 
             :
             <IncomeForm setEditIncome={setEditIncome} user={user} setUser={setUser}/>}  
          </div>
          <div className="expenseContent">
            <h2 className="expenseTitle">Expenses:</h2>
            { newExpense ? 
            <>
              <NewExpenseForm user={user} handleSetUserExpenses={handleSetUserExpenses} categories={categories}/>
              <button className="newExpenseFormCancelButton" onClick={() => setNewExpense(false)}>Cancel</button>
            </>
            :<div>
              <div className="expenseListDiv" >
                {userExpenses.map((expense) => {
                  return (
                  <div className="expenseListItems" key={expense.id}>
                    <p className="expenseDate">{expense.paid_on.substring(5)}</p>
                    <p className="expenseName"> {expense.name} </p>
                    <p className="expenseAmount"> ${expense.amount}</p> 
                    <p id="deleteExpenseButton" className="material-icons" onClick={() => handleExpenseDelete(expense)}>delete_forever</p>
                  </div>
                  )})}   
                </div>
                <button onClick={() => setNewExpense(true)}>Add New Expense</button>
              </div>}
            </div>
          </div>
        </div>
      <div className="budgetBreakdownWrap">  
        <BudgetBreakdown chartOptions={chartOptions} handleExpenseResetButton={handleExpenseResetButton}/>
        <div className="remainingDiv">
          <div className="remainingDivContent">
            <h3 className="remainingDivTitles">Total Income:</h3>
            <p className="remainingDivAmounts">${user.income}</p>
          </div>
          <div className="remainingDivContent">
            <h3 className="remainingDivTitles">Total Expenses:</h3> 
            <p className="remainingDivAmounts">${userExpenses.map((expense) => expense.amount).reduce((a, b)=> a + b, 0)}</p>
          </div>
          <div className="remainingDivTotals">
            <h3 className="remainingDivTitles">Remaining:</h3>
            <p className="remainingDivAmounts">${user.income - userExpenses.map((expense) => expense.amount).reduce((a, b)=> a + b, 0)}</p>
          </div>
        </div>
        {budgetBreakdownMessage()}
      </div>
    </div>
  </div>
</div>
  )
}

export default Home