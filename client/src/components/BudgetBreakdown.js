import React, { useState } from "react";
import Chart from 'react-apexcharts';

function BudgetBreakdown({ categories }){

  const chartData = categories.filter((cat) => cat.total_expense_cost > 0);
  const [chartOptions, setChartOptions] = useState({
    options: { labels: chartData.map((cat) => cat.name),
      chart: {
        width: '100%',
        type: 'pie',
      },
      tooltip: {
        custom: function({ series, seriesIndex, w }) {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.globals.labels[seriesIndex] +
            ": " + "$" +
            series[seriesIndex] +
            "</span>" +
            "</div>"
          );
        }
      },
      title: {
        text: `For : ${new Date().toLocaleString("en-US", { month: "long" })} ${new Date().getFullYear()}`,
        align: 'center' }},
    series: chartData.map((cat) => cat.total_expense_cost),
  })

  return(
    <div>
      <h3>Budget Breakdown:</h3>
      <div className="donut">
        <Chart options={chartOptions.options} series={chartOptions.series} type="pie"/>
      </div>
    </div>
  );
}

export default BudgetBreakdown