import React, { useState } from "react";
import styles from "./IncomeForm.module.css";
import {
  FaMoneyBillWave,
  FaPiggyBank,
  FaBriefcase,
  FaChartLine,
  FaTrash,
} from "react-icons/fa";

function IncomeForm({ setIncome }) {
  const [incomeList, setIncomeList] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const categories = [
    { name: "Зарплата", icon: <FaBriefcase /> },
    { name: "Пасивний дохід", icon: <FaPiggyBank /> },
    { name: "Фріланс", icon: <FaMoneyBillWave /> },
    { name: "Інвестиції", icon: <FaChartLine /> },
  ];

  const handleAddIncome = () => {
    if (amount && category) {
      const newIncome = {
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        description: description || "Без опису",
      };
      setIncomeList((prev) => [...prev, newIncome]);
      setIncome((prev) => prev + parseFloat(amount));
      setAmount("");
      setCategory("");
      setDescription("");
    } else {
      alert("Будь ласка, введіть суму та оберіть категорію.");
    }
  };

  const handleDeleteIncome = (id) => {
    const updatedList = incomeList.filter((income) => income.id !== id);
    const deletedIncome = incomeList.find((income) => income.id === id);
    setIncomeList(updatedList);
    setIncome((prev) => prev - deletedIncome.amount);
  };

  return (
    <div className={styles.container}>
      <h2>Додати дохід</h2>
      <div className={styles.form}>
        <input
          type="number"
          placeholder="Сума доходу"
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
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Опис (необов'язково)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddIncome} className={styles.addButton}>
          Додати
        </button>
      </div>
      <div className={styles.incomeList}>
        <h3>Список доходів</h3>
        <ul>
          {incomeList.map((income) => (
            <li key={income.id} className={styles.incomeItem}>
              <span className={styles.icon}>
                {categories.find((cat) => cat.name === income.category)?.icon}
              </span>
              <span>
                {income.category}: {income.description}
              </span>
              <span>{income.amount} грн</span>
              <button
                onClick={() => handleDeleteIncome(income.id)}
                className={styles.deleteButton}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IncomeForm;
