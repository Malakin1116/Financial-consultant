import styles from "./Summary.module.css";

function Summary({
  day,
  totalIncome,
  totalExpense,
  balance,
  monthIncome,
  monthExpense,
  monthBalance,
}) {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.daySummary}>
        <h2>День {day} Summary</h2>
        <p>Total Income: {totalIncome} грн</p>
        <p>Total Expense: {totalExpense} грн</p>
        <p>
          Balance:{" "}
          <strong style={{ color: balance >= 0 ? "green" : "red" }}>
            {balance} грн
          </strong>
        </p>
      </div>
      <div className={styles.monthSummary}>
        <h2>Month Summary (31 days)</h2>
        <p>Total Income: {monthIncome} грн</p>
        <p>Total Expense: {monthExpense} грн</p>
        <p>
          Balance:{" "}
          <strong style={{ color: monthBalance >= 0 ? "green" : "red" }}>
            {monthBalance} грн
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Summary;
