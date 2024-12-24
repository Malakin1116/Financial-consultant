import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";

function ExpenseForm({ expenses, setExpenses }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  // Попередньо визначені категорії витрат
  const predefinedCategories = [
    "Їжа",
    "Транспорт",
    "Оренда",
    "Розваги",
    "Авто",
    "Інше",
  ];

  const handleAddExpense = () => {
    // Вибір фінальної категорії (якщо "Інше", беремо customCategory)
    const finalCategory = category === "Інше" ? customCategory : category;

    if (amount && finalCategory) {
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: finalCategory,
      };
      setExpenses((prev) => [...prev, newExpense]);
      setAmount("");
      setCategory("");
      setCustomCategory("");
    } else {
      alert("Будь ласка, заповніть усі поля!");
    }
  };

  return (
    <div className={styles.container}>
      <h3>Додати витрати</h3>
      <input
        type="number"
        placeholder="Сума витрат"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.select}
      >
        <option value="">Оберіть категорію</option>
        {predefinedCategories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {category === "Інше" && (
        <input
          type="text"
          placeholder="Введіть власну категорію"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className={styles.input}
        />
      )}
      <button onClick={handleAddExpense} className={styles.addButton}>
        Додати
      </button>
    </div>
  );
}

export default ExpenseForm;
