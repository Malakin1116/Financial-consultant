import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IncomeForm from "./components/IncomeForm/IncomeForm";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Assets from "./components/Assets/Assets";
import Goals from "./components/Goals/Goals";
import Achievements from "./components/Achievements/Achievements";
import "./App.css";

function App() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [xp, setXp] = useState(0); // Досвід користувача
  const [level, setLevel] = useState(1); // Рівень користувача
  const [timeSpent, setTimeSpent] = useState(0); // Час у програмі (хвилини)
  const [newLevel, setNewLevel] = useState(false); // Прапорець для анімації рівня

  // Оновлюємо час у програмі кожну хвилину
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
      setXp((prev) => prev + 1); // +1 XP кожну хвилину
    }, 60000); // 60,000 мс = 1 хвилина

    return () => clearInterval(timer); // Очищення таймера
  }, []);

  // Оновлюємо рівень залежно від XP
  useEffect(() => {
    const newLevel = Math.floor(xp / 100) + 1; // 100 XP = 1 рівень
    if (newLevel > level) {
      setLevel(newLevel);
      setNewLevel(true);
      setTimeout(() => setNewLevel(false), 3000); // Анімація триває 3 секунди
    }
  }, [xp]);

  return (
    <div className="game-app">
      <header>
        <h1>Фінансовий виклик</h1>
        <div className="stats">
          <div className="level">Рівень: {level}</div>
          <div className="time-spent">Час у додатку: {timeSpent} хв</div>
        </div>
        <div className="xp-bar">
          <span>Досвід: {xp % 100}/100</span>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${xp % 100}%` }}></div>
          </div>
        </div>
      </header>

      {/* Анімація нового рівня */}
      {newLevel && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="level-up"
        >
          🎉 Вітаємо! Ви досягли {level} рівня! 🎉
        </motion.div>
      )}

      <main>
        <IncomeForm setIncome={setIncome} />
        <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
        <Dashboard income={income} expenses={expenses} />
        <Goals income={income} />
        <Assets />
        <Achievements xp={xp} />
      </main>
    </div>
  );
}

export default App;
