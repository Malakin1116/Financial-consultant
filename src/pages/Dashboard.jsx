import styles from "./Dashboard.module.css";

function Dashboard() {
  const incomeList = JSON.parse(localStorage.getItem("incomeList")) || [];
  const expensesList = JSON.parse(localStorage.getItem("expensesList")) || [];

  const totalIncome = incomeList.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpenses = expensesList.reduce((sum, exp) => sum + exp.amount, 0);
  const dailyIncome = totalIncome / 30;
  const dailyNet = dailyIncome - totalExpenses / 30;

  return (
    <div className={styles.container}>
      <h1>Головна</h1>
      <p>Доходи за місяць: {totalIncome} грн</p>
      <p>Витрати за місяць: {totalExpenses} грн</p>
      <p>Чистий дохід за день: {dailyNet.toFixed(2)} грн</p>
    </div>
  );
}

export default Dashboard;
