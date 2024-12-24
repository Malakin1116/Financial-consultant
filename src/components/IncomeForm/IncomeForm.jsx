import React, { useState } from "react";
import styles from "./IncomeForm.module.css";

function IncomeForm({ setIncome }) {
  const [inputIncome, setInputIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeValue = parseFloat(inputIncome);
    if (!isNaN(incomeValue)) {
      setIncome(incomeValue);
    }
    setInputIncome("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Введіть місячний дохід:</label>
      <input
        type="number"
        value={inputIncome}
        onChange={(e) => setInputIncome(e.target.value)}
        placeholder="Ваш дохід"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Додати
      </button>
    </form>
  );
}

export default IncomeForm;
