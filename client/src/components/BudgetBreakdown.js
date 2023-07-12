import React, { useState } from "react";
import Chart from 'react-apexcharts';

function BudgetBreakdown({ chartOptions, setUserExpenses }){

  return(
    <div className="budgetBreakdownContent">
      <h2 className="budgetBreakDownTitle">Budget Breakdown:</h2>
      <p>{`For : ${new Date().toLocaleString("en-US", { month: "long" })} ${new Date().getFullYear()}`}</p>
      <div className="pie">
        <Chart options={chartOptions.options} series={chartOptions.series} type="pie"/>
      </div>
      <p className="resetButton">Reset Expenses</p>
    </div>
  );
}

export default BudgetBreakdown