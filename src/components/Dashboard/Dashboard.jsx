import React from "react";
import styles from "./Dashboard.module.css";

function Dashboard({ income, expenses }) {
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const dailyBudget = income / 30;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Зведення:</h2>
      <p className={styles.item}>Дохід на день: {dailyBudget.toFixed(2)} грн</p>
      <p className={styles.item}>
        Загальні витрати: {totalExpenses.toFixed(2)} грн
      </p>
      {expenses.length > 0 && (
        <ul className={styles.list}>
          {expenses.map((expense, index) => (
            <li key={index} className={styles.item}>
              {expense.name}: {expense.amount} грн
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
