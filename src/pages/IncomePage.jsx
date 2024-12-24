import { useState, useEffect } from "react";
import styles from "./IncomePage.module.css";

function IncomePage() {
  const [incomeList, setIncomeList] = useState(() => {
    const savedIncome = localStorage.getItem("incomeList");
    return savedIncome ? JSON.parse(savedIncome) : [];
  });

  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("Зарплата");
  const [customCategory, setCustomCategory] = useState(""); // Поле для власної категорії

  const handleAddIncome = (e) => {
    e.preventDefault();
    const amount = parseFloat(incomeAmount);
    const category =
      incomeCategory === "Інше" && customCategory.trim() !== ""
        ? customCategory
        : incomeCategory;

    if (!isNaN(amount) && amount > 0 && category.trim() !== "") {
      const newIncome = { id: Date.now(), amount, category };
      setIncomeList((prev) => [...prev, newIncome]);
      setIncomeAmount("");
      setIncomeCategory("Зарплата");
      setCustomCategory(""); // Скидаємо значення після додавання
    }
  };

  useEffect(() => {
    localStorage.setItem("incomeList", JSON.stringify(incomeList));
  }, [incomeList]);

  return (
    <div className={styles.container}>
      <h1>Дохід</h1>
      <form onSubmit={handleAddIncome} className={styles.form}>
        <input
          type="number"
          placeholder="Сума доходу"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
          className={styles.input}
        />
        <select
          value={incomeCategory}
          onChange={(e) => setIncomeCategory(e.target.value)}
          className={styles.input}
        >
          <option value="Зарплата">Зарплата</option>
          <option value="Пасивний дохід">Пасивний дохід</option>
          <option value="Інше">Інше</option>
        </select>
        {incomeCategory === "Інше" && (
          <input
            type="text"
            placeholder="Введіть свою категорію"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className={styles.input}
          />
        )}
        <button type="submit" className={styles.button}>
          Додати дохід
        </button>
      </form>
      <ul className={styles.list}>
        {incomeList.map((income) => (
          <li key={income.id} className={styles.item}>
            {income.category}: {income.amount} грн
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomePage;
