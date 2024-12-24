import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import IncomeForm from "./components/IncomeForm/IncomeForm";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Goals from "./components/Goals/Goals";
import Achievements from "./components/Achievements/Achievements";
import ExpenseAnalysis from "./components/ExpenseAnalysis/ExpenseAnalysis";
import FilterSelector from "./components/FilterSelector/FilterSelector";
import "./App.css";

function App() {
  const [income, setIncome] = useState(
    () => JSON.parse(localStorage.getItem("income")) || 0
  );
  const [expenses, setExpenses] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [xp, setXp] = useState(
    () => JSON.parse(localStorage.getItem("xp")) || 0
  );
  const [level, setLevel] = useState(
    () => Math.floor((JSON.parse(localStorage.getItem("xp")) || 0) / 100) + 1
  );
  const [filter, setFilter] = useState("month"); // Фільтр: день, тиждень, місяць, всі

  // Збереження даних
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("xp", JSON.stringify(xp));
  }, [income, expenses, xp]);

  // Підрахунок досвіду
  useEffect(() => {
    const interval = setInterval(() => {
      setXp((prevXp) => prevXp + 1);
    }, 60000); // Додаємо 1 XP кожну хвилину

    return () => clearInterval(interval);
  }, []);

  // Оновлення рівня
  useEffect(() => {
    setLevel(Math.floor(xp / 100) + 1);
  }, [xp]);

  // Фільтрування витрат
  const filteredExpenses = expenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date || Date.now());

    if (filter === "day") {
      return expenseDate.toDateString() === today.toDateString();
    } else if (filter === "week") {
      const weekStart = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      return expenseDate >= weekStart;
    } else if (filter === "month") {
      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    }
    return true; // "all"
  });

  // Скидання даних
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Ви впевнені, що хочете скинути всі дані?"
    );
    if (confirmReset) {
      localStorage.clear();
      setIncome(0);
      setExpenses([]);
      setXp(0);
      setLevel(1);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <header className="app-header">
        <h1>FinTrack</h1>
        <div className="stats">
          <p>Рівень: {level}</p>
          <p>Досвід: {xp}</p>
        </div>
        <button className="reset-button" onClick={handleReset}>
          Оновити дані
        </button>
      </header>
      <main className="app-main">
        {/* <FilterSelector filter={filter} setFilter={setFilter} /> */}
        <section className="section">
          <IncomeForm setIncome={setIncome} />
        </section>
        <section className="section">
          <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
          <ExpenseAnalysis expenses={filteredExpenses} income={income} />
        </section>
        <section className="section">
          <Goals income={income} />
        </section>
        <section className="section">
          <Dashboard income={income} expenses={filteredExpenses} />
          <Achievements xp={xp} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
