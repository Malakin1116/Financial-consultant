import React, { useState } from "react";
import styles from "./Goals.module.css";

function Goals({ income }) {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [savingPercent, setSavingPercent] = useState(20);
  const [templateGoal, setTemplateGoal] = useState("");

  const handleAddGoal = (e) => {
    e.preventDefault();
    const amount = parseFloat(goalAmount);
    const name = templateGoal || goalName;
    if (name && !isNaN(amount)) {
      setGoals([...goals, { name, amount, savingPercent, progress: 0 }]);
    }
    setGoalName("");
    setGoalAmount("");
    setTemplateGoal("");
  };

  const handleDeleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  return (
    <div className={styles.container}>
      <h2>Фінансові цілі</h2>
      <ul>
        {goals.map((goal, index) => {
          const dailySavings = (income / 30) * (goal.savingPercent / 100);
          const daysToGoal = Math.ceil(goal.amount / dailySavings);
          const progress =
            Math.min((dailySavings * daysToGoal) / goal.amount, 1) * 100;

          return (
            <li key={index} className={styles.goal}>
              <div>
                {goal.name}: {goal.amount} грн ({goal.savingPercent}% доходу) —{" "}
                {daysToGoal} днів
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteGoal(index)}
              >
                Видалити
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleAddGoal}>
        <label className={styles.label}>Шаблон цілі:</label>
        <select
          value={templateGoal}
          onChange={(e) => setTemplateGoal(e.target.value)}
          className={styles.input}
        >
          <option value="">Обрати шаблон</option>
          <option value="Квартира">Квартира</option>
          <option value="Машина">Машина</option>
          <option value="Відпочинок">Відпочинок</option>
          <option value="">Інше</option>
        </select>
        {templateGoal === "" && (
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Назва цілі"
            className={styles.input}
          />
        )}
        <input
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          placeholder="Сума"
          className={styles.input}
        />
        <label className={styles.label}>Відсоток доходу:</label>
        <input
          type="number"
          value={savingPercent}
          onChange={(e) => setSavingPercent(e.target.value)}
          placeholder="Відсоток"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Додати ціль
        </button>
      </form>
    </div>
  );
}

export default Goals;
