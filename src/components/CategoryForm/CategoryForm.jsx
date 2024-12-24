import React, { useState } from "react";
import styles from "./CategoryForm.module.css";

function CategoryForm({ categoryName, expenses, setExpenses }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    if (name && amount) {
      const newExpense = {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category: categoryName,
      };
      setExpenses((prev) => [...prev, newExpense]);
      setName("");
      setAmount("");
    } else {
      alert("Будь ласка, введіть назву витрат та суму.");
    }
  };

  return (
    <div className={styles.container}>
      <h3>{categoryName}</h3>
      <input
        type="text"
        placeholder="Назва витрат"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Сума витрат"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleAddExpense} className={styles.addButton}>
        Додати
      </button>
      <ul className={styles.expenseList}>
        {expenses
          .filter((expense) => expense.category === categoryName)
          .map((expense) => (
            <li key={expense.id} className={styles.expenseItem}>
              {expense.name}: {expense.amount} грн
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CategoryForm;
