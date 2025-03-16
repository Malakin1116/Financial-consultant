import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../Huk/useLocalStorage";
import DayCard from "../components/DayCard/DayCard";
import Modal from "../components/Modal/Modal";
import Summary from "../components/Summary/Summary";
import styles from "./FinanceControlPage.module.css";

function FinanceControlPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const storageKey = `dailyData_${selectedYear}_${selectedMonth}`;
  const [dailyData, setDailyData] = useLocalStorage(
    storageKey,
    Array.from({ length: daysInMonth }, () => ({ income: [], expense: [] }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    type: "income",
    amount: "",
    description: "",
    id: null,
    category: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Оновлюємо dailyData лише при зміні місяця або року, але з умовною перевіркою
  useEffect(() => {
    const newDaysInMonth = new Date(
      selectedYear,
      selectedMonth + 1,
      0
    ).getDate();
    const prevDaysInMonth = dailyData.length;

    if (newDaysInMonth !== prevDaysInMonth) {
      setDailyData((prev) => {
        const newData = Array.from({ length: newDaysInMonth }, (_, i) =>
          i < prevDaysInMonth ? prev[i] : { income: [], expense: [] }
        );
        return newData;
      });
    }

    if (selectedDay > newDaysInMonth) {
      setSelectedDay(newDaysInMonth);
    }
  }, [selectedMonth, selectedYear, setDailyData, dailyData.length]);

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const openModal = (day, type, record = null) => {
    setSelectedDay(day);
    setModalData({
      type:
        type ||
        (record ? (record.amount >= 0 ? "income" : "expense") : "income"),
      amount: record ? Math.abs(record.amount).toString() : "",
      description: record ? record.description : "",
      id: record ? record.id : null,
      category: record ? record.category || "" : "",
    });
    setIsModalOpen(true);
  };

  const handleSaveRecord = () => {
    if (isSaving) return;
    setIsSaving(true);

    if (
      !modalData.amount ||
      isNaN(parseFloat(modalData.amount)) ||
      parseFloat(modalData.amount) <= 0
    ) {
      alert("Будь ласка, введіть коректну суму більше 0.");
      setIsSaving(false);
      return;
    }

    const amount =
      modalData.type === "income"
        ? parseFloat(modalData.amount)
        : -parseFloat(modalData.amount);
    const newRecord = {
      id: modalData.id || uuidv4(),
      amount,
      description:
        modalData.description.trim() ||
        (modalData.category === "Інше" ? "Без опису" : modalData.category),
      category:
        modalData.category ||
        (modalData.type === "income" ? "Інше" : "Продукти"),
    };

    setDailyData((prev) => {
      const updated = [...prev];
      const dayData = updated[selectedDay - 1];
      if (modalData.id) {
        const records = amount >= 0 ? dayData.income : dayData.expense;
        const index = records.findIndex((r) => r.id === modalData.id);
        if (index !== -1) records[index] = newRecord;
      } else {
        if (amount >= 0) dayData.income.push(newRecord);
        else dayData.expense.push(newRecord);
      }
      return updated;
    });

    setModalData({
      type: "income",
      amount: "",
      description: "",
      id: null,
      category: "",
    });
    setIsModalOpen(false);
    setIsSaving(false);
  };

  const handleDeleteRecord = (recordId) => {
    setDailyData((prev) => {
      const updated = [...prev];
      const dayData = updated[selectedDay - 1];
      dayData.income = dayData.income.filter((r) => r.id !== recordId);
      dayData.expense = dayData.expense.filter((r) => r.id !== recordId);
      return updated;
    });
  };

  const currentDayData = dailyData[selectedDay - 1] || {
    income: [],
    expense: [],
  };
  const totalIncome = currentDayData.income.reduce(
    (sum, r) => sum + r.amount,
    0
  );
  const totalExpense = Math.abs(
    currentDayData.expense.reduce((sum, r) => sum + r.amount, 0)
  );
  const balance = totalIncome - totalExpense;

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === selectedYear && today.getMonth() === selectedMonth;
  const todayDay = isCurrentMonth ? today.getDate() : null;
  const todayData = isCurrentMonth
    ? dailyData[todayDay - 1]
    : { income: [], expense: [] };
  const todayIncome = todayData.income
    ? todayData.income.reduce((sum, r) => sum + r.amount, 0)
    : 0;
  const todayExpense = todayData.expense
    ? Math.abs(todayData.expense.reduce((sum, r) => sum + r.amount, 0))
    : 0;
  const todayBalance = todayIncome - todayExpense;

  const totalMonthIncome = dailyData.reduce(
    (acc, day) =>
      acc + (day.income ? day.income.reduce((s, r) => s + r.amount, 0) : 0),
    0
  );
  const totalMonthExpense = Math.abs(
    dailyData.reduce(
      (acc, day) =>
        acc + (day.expense ? day.expense.reduce((s, r) => s + r.amount, 0) : 0),
      0
    )
  );
  const totalMonthBalance = totalMonthIncome - totalMonthExpense;

  const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const incomeCategories = [
    "Зарплата",
    "Депозит",
    "Облігація",
    "Кредит",
    "Аванс",
    "Передоплата",
    "Крипта",
    "Позика",
    "Допомога",
    "Інше",
  ];

  const expenseCategories = [
    "Продукти",
    "Транспорт",
    "Комуналка",
    "Оренда",
    "Розваги",
    "Здоров’я",
    "Освіта",
    "Техніка",
    "Одяг",
    "Інше",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.todaySummary}>
        <h2>Сьогодні (День {isCurrentMonth ? todayDay : "-"})</h2>
        <p>Доходи: {todayIncome} грн</p>
        <p>Витрати: {todayExpense} грн</p>
        <p>
          Баланс:{" "}
          <strong style={{ color: todayBalance >= 0 ? "green" : "red" }}>
            {todayBalance} грн
          </strong>
        </p>
        {isCurrentMonth && (
          <div className={styles.todayActions}>
            <button
              className={styles.addIncomeButton}
              onClick={() => openModal(todayDay, "income")}
              disabled={isSaving}
            >
              <span className={styles.icon}>💰</span> Додати дохід
            </button>
            <button
              className={styles.addExpenseButton}
              onClick={() => openModal(todayDay, "expense")}
              disabled={isSaving}
            >
              <span className={styles.icon}>🛒</span> Додати витрату
            </button>
          </div>
        )}
      </div>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrevMonth}>
          ◄
        </button>
        <h1 className={styles.title}>
          {monthNames[selectedMonth]} {selectedYear} р.
        </h1>
        <button className={styles.navButton} onClick={handleNextMonth}>
          ►
        </button>
      </div>
      <div className={styles.daysContainer}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dayIncome =
            dailyData[day - 1]?.income?.reduce((sum, r) => sum + r.amount, 0) ||
            0;
          const dayExpense = Math.abs(
            dailyData[day - 1]?.expense?.reduce(
              (sum, r) => sum + r.amount,
              0
            ) || 0
          );
          return (
            <DayCard
              key={day}
              day={day}
              selected={day === selectedDay}
              onClick={() => {
                setSelectedDay(day);
                setShowDetails(true);
              }}
              income={dayIncome}
              expense={dayExpense}
              onEdit={() => openModal(day)}
            />
          );
        })}
      </div>
      {showDetails && (
        <div className={styles.detailsContainer}>
          <h2>Деталі для Дня {selectedDay}</h2>
          <div className={styles.detailsSection}>
            <h3>Доходи</h3>
            {currentDayData.income.length > 0 ? (
              currentDayData.income.map((record, index) => (
                <p key={`${record.id}-${index}`}>
                  {record.category}: {record.amount} грн - {record.description}
                </p>
              ))
            ) : (
              <p>Немає доходів за цей день.</p>
            )}
          </div>
          <div className={styles.detailsSection}>
            <h3>Витрати</h3>
            {currentDayData.expense.length > 0 ? (
              currentDayData.expense.map((record, index) => (
                <p key={`${record.id}-${index}`}>
                  {record.category}: {Math.abs(record.amount)} грн -{" "}
                  {record.description}
                </p>
              ))
            ) : (
              <p>Немає витрат за цей день.</p>
            )}
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setShowDetails(false)}
          >
            Закрити
          </button>
        </div>
      )}
      <Summary
        day={selectedDay}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        monthIncome={totalMonthIncome}
        monthExpense={totalMonthExpense}
        monthBalance={totalMonthBalance}
      />
      <Modal
        isOpen={isModalOpen}
        day={selectedDay}
        onClose={() => {
          setIsModalOpen(false);
          setModalData({
            type: "income",
            amount: "",
            description: "",
            id: null,
            category: "",
          });
        }}
        onSave={handleSaveRecord}
        data={modalData}
        onDataChange={(e) =>
          setModalData({ ...modalData, [e.target.name]: e.target.value })
        }
        onDelete={() => handleDeleteRecord(modalData.id)}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
      />
    </div>
  );
}

export default FinanceControlPage;
