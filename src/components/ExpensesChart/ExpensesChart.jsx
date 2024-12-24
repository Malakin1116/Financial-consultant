import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./ExpensesChart.module.css";

// Реєстрація компонентів Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ExpensesChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p>Немає витрат для відображення графіка.</p>;
  }

  const data = {
    labels: expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Сума витрат (грн)",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h3>Графік витрат</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ExpensesChart;
