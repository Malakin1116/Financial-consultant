import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";

function ExpenseForm({ expenses, setExpenses }) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (expenseName && !isNaN(amount)) {
      setExpenses([...expenses, { name: expenseName, amount }]);
    }
    setExpenseName("");
    setExpenseAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Введіть витрати:</label>
      <input
        type="text"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        placeholder="Назва витрат"
        className={styles.input}
      />
      <input
        type="number"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
        placeholder="Сума витрат"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Додати
      </button>
    </form>
  );
}

export default ExpenseForm;
