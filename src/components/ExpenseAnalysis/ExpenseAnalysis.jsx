import React from "react";
import {
  FaUtensils,
  FaBus,
  FaHome,
  FaSmile,
  FaCar,
  FaQuestion,
} from "react-icons/fa";
import styles from "./ExpenseAnalysis.module.css";

function ExpenseAnalysis({ expenses }) {
  // Попередньо визначені категорії
  const predefinedCategories = [
    { name: "Їжа", icon: <FaUtensils />, color: "#FF6384" },
    { name: "Транспорт", icon: <FaBus />, color: "#36A2EB" },
    { name: "Оренда", icon: <FaHome />, color: "#FFCE56" },
    { name: "Розваги", icon: <FaSmile />, color: "#4BC0C0" },
    { name: "Авто", icon: <FaCar />, color: "#9b59b6" },
  ];

  // Групування витрат за категоріями
  const groupedExpenses = expenses.reduce(
    (acc, expense) => {
      const category = acc.find((cat) => cat.name === expense.category);
      if (category) {
        category.total += expense.amount;
      } else {
        acc.push({
          name: expense.category,
          total: expense.amount,
          icon: <FaQuestion />,
          color: "#7f8c8d",
        });
      }
      return acc;
    },
    [...predefinedCategories.map((cat) => ({ ...cat, total: 0 }))]
  );

  return (
    <div className={styles.container}>
      <h3>Аналіз витрат</h3>
      <div className={styles.categories}>
        {groupedExpenses.map((category, index) => (
          <div
            key={index}
            className={styles.categoryCard}
            style={{ backgroundColor: category.color }}
          >
            <div className={styles.categoryHeader}>
              {category.icon}
              <span>{category.name}</span>
            </div>
            <p className={styles.amount}>{category.total} грн</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseAnalysis;
