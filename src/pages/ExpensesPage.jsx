import { useState, useEffect } from "react";
import styles from "./ExpensesPage.module.css";

function ExpensesPage() {
  const [expensesList, setExpensesList] = useState(() => {
    const savedExpenses = localStorage.getItem("expensesList");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Оренда");
  const [customCategory, setCustomCategory] = useState(""); // Поле для власної категорії

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    const category =
      expenseCategory === "Інше" && customCategory.trim() !== ""
        ? customCategory
        : expenseCategory;

    if (!isNaN(amount) && amount > 0 && category.trim() !== "") {
      const newExpense = { id: Date.now(), amount, category };
      setExpensesList((prev) => [...prev, newExpense]);
      setExpenseAmount("");
      setExpenseCategory("Оренда");
      setCustomCategory(""); // Скидаємо власну категорію після додавання
    }
  };

  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  return (
    <div className={styles.container}>
      <h1>Витрати</h1>
      <form onSubmit={handleAddExpense} className={styles.form}>
        <input
          type="number"
          placeholder="Сума витрат"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className={styles.input}
        />
        <select
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
          className={styles.input}
        >
          <option value="Оренда">Оренда</option>
          <option value="Комунальні послуги">Комунальні послуги</option>
          <option value="Поповнення телефону">Поповнення телефону</option>
          <option value="Інше">Інше</option>
        </select>
        {expenseCategory === "Інше" && (
          <input
            type="text"
            placeholder="Введіть свою категорію"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className={styles.input}
          />
        )}
        <button type="submit" className={styles.button}>
          Додати витрату
        </button>
      </form>
      <ul className={styles.list}>
        {expensesList.map((expense) => (
          <li key={expense.id} className={styles.item}>
            {expense.category}: {expense.amount} грн
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesPage;
