import React from "react";

function BudgetBreakdown({ categories }){
  return(
    <div>
      <h3>Budget Breakdown:</h3>
      <p>For : {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()}</p>
      {categories.map((category) => {
        return (
          <p key={category.id}>{category.total_expense_cost}</p>
        );
      })}
    </div>
  );
}

export default BudgetBreakdown