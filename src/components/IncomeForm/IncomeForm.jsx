import React, { useState } from "react";
import styles from "./IncomeForm.module.css";

function IncomeForm({ setIncome }) {
  const [inputIncome, setInputIncome] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeValue = parseFloat(inputIncome);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      setError("Введіть коректну суму доходу!");
    } else {
      setError("");
      setIncome(incomeValue);
      setInputIncome("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Введіть місячний дохід:</label>
      <input
        type="number"
        value={inputIncome}
        onChange={(e) => setInputIncome(e.target.value)}
        placeholder="Наприклад, 10000"
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      {error && <p className={styles.errorText}>{error}</p>}
      <button type="submit" className={styles.button}>
        Додати
      </button>
    </form>
  );
}

export default IncomeForm;
