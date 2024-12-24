import React, { useState } from "react";
import IncomeForm from "./components/IncomeForm/IncomeForm";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [income, setIncome] = useState(0); // Загальний дохід
  const [expenses, setExpenses] = useState([]); // Массив витрат

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Фінансовий консультант</h1>
      <IncomeForm setIncome={setIncome} />
      <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
      <Dashboard income={income} expenses={expenses} />
    </div>
  );
}

export default App;
