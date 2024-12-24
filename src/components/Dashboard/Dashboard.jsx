import React from "react";
import styles from "./Dashboard.module.css";

function Dashboard({ income, expenses }) {
  const recurringExpenses = expenses
    .filter((expense) => expense.type === "recurring")
    .reduce((acc, expense) => acc + expense.amount, 0);
  const recurringPerDay = recurringExpenses / 30;

  const oneTimeExpenses = expenses
    .filter((expense) => expense.type === "one-time")
    .reduce((acc, expense) => acc + expense.amount, 0);

  const totalExpensesPerDay = recurringPerDay + oneTimeExpenses;
  const dailyBudget = income / 30 - totalExpensesPerDay;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Зведення:</h2>
      <p className={styles.item}>Дохід на день: {dailyBudget.toFixed(2)} грн</p>
      <p className={styles.item}>
        Разові витрати: {oneTimeExpenses.toFixed(2)} грн
      </p>
      <p className={styles.item}>
        Постійні витрати на день: {recurringPerDay.toFixed(2)} грн
      </p>
    </div>
  );
}

export default Dashboard;
