import { useState, useRef, useEffect } from "react";
import styles from "./FinanceControlPage.module.css";

/**
 * Кастомний хук для зчитування/запису в localStorage
 * і "запобіжник" від повторних викликів у StrictMode.
 */
function useLocalStorage(key, initialValue) {
  const isMountedRef = useRef(false);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Помилка читання з localStorage:", error);
      return initialValue;
    }
  });

  // При першому реальному монтуванні (без повтору Strict Mode) будемо оновлювати localStorage
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return; // пропускаємо перший “подвійний” виклик
    }
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Помилка запису в localStorage:", error);
    }
  }, [storedValue, key]);

  // Зберігаємо нове значення і в localStorage
  const setValue = (value) => {
    try {
      if (typeof value === "function") {
        setStoredValue((prev) => {
          const newVal = value(prev);
          localStorage.setItem(key, JSON.stringify(newVal));
          return newVal;
        });
      } else {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Помилка запису в localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

function FinanceControlPage() {
  // Кількість днів
  const TOTAL_DAYS = 31;

  // Створюємо початковий масив днів (income/expense)
  const createInitialData = () => {
    return Array.from({ length: TOTAL_DAYS }, () => ({
      income: [],
      expense: [],
    }));
  };

  // Зберігаємо у localStorage (через наш хук)
  const [dailyData, setDailyData] = useLocalStorage(
    "dailyData",
    createInitialData()
  );

  // Обраний день
  const [selectedDay, setSelectedDay] = useState(1);

  // Модалка
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("income"); // "income" або "expense"
  const [modalInput, setModalInput] = useState({ amount: "", description: "" });

  // Відкрити модалку
  const openModal = (type, day) => {
    setSelectedDay(day);
    setModalType(type);
    setIsModalOpen(true);
  };

  // Додавання запису (дохід/витрата)
  const handleAddRecord = () => {
    const { amount, description } = modalInput;
    const parsedAmount = parseFloat(amount);

    // 1) Перевірка на валідність суми
    if (!amount || isNaN(parsedAmount)) {
      alert("Введіть коректну суму (число).");
      return;
    }
    if (parsedAmount <= 0) {
      alert("Сума повинна бути більшою за 0!");
      return;
    }

    // 2) Опис не може бути порожнім
    if (!description.trim()) {
      alert("Введіть опис операції.");
      return;
    }

    // Створюємо новий запис
    const newRecord = {
      id: Date.now(),
      amount: parsedAmount,
      description: description.trim(),
    };

    // Оновлюємо дані конкретного дня
    setDailyData((prevData) => {
      const updated = [...prevData];
      updated[selectedDay - 1][modalType].push(newRecord);
      return updated;
    });

    // Закриваємо модалку, чистимо поля
    setModalInput({ amount: "", description: "" });
    setIsModalOpen(false);
  };

  // Видалення запису
  const handleDeleteRecord = (recordId, type) => {
    setDailyData((prevData) => {
      const updated = [...prevData];
      updated[selectedDay - 1][type] = updated[selectedDay - 1][type].filter(
        (item) => item.id !== recordId
      );
      return updated;
    });
  };

  // Скинути всі дані (обнулити localStorage)
  const handleResetAllData = () => {
    if (window.confirm("Ви впевнені, що хочете видалити всі дані?")) {
      setDailyData(createInitialData());
    }
  };

  // Дані обраного дня
  const currentDayData = dailyData[selectedDay - 1];

  // Підрахунок загальних сум за обраний день
  const totalIncome = currentDayData.income.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalExpense = currentDayData.expense.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const balance = totalIncome - totalExpense;

  // Сума доходів/витрат/балансу за всі 31 день (загальний підсумок)
  const totalMonthIncome = dailyData.reduce(
    (acc, day) => acc + day.income.reduce((s, rec) => s + rec.amount, 0),
    0
  );
  const totalMonthExpense = dailyData.reduce(
    (acc, day) => acc + day.expense.reduce((s, rec) => s + rec.amount, 0),
    0
  );
  const totalMonthBalance = totalMonthIncome - totalMonthExpense;

  return (
    <div className={styles.container}>
      <h1>Контроль фінансів</h1>

      {/* Кнопка "Скинути всі дані" (опційна) */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={handleResetAllData}
          className={styles.deleteButton}
          style={{ padding: "10px 20px" }}
        >
          Скинути всі дані
        </button>
      </div>

      {/* Картки днів */}
      <div className={styles.daysContainer}>
        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
          // Підрахунки (для відображення у картці дня)
          const dayIncome = dailyData[day - 1].income.reduce(
            (sum, item) => sum + item.amount,
            0
          );
          const dayExpense = dailyData[day - 1].expense.reduce(
            (sum, item) => sum + item.amount,
            0
          );

          // Усі записи цього дня
          const recordsOfTheDay = [
            ...dailyData[day - 1].income.map((r) => ({
              ...r,
              type: "income",
            })),
            ...dailyData[day - 1].expense.map((r) => ({
              ...r,
              type: "expense",
            })),
          ];

          return (
            <div
              key={day}
              className={`${styles.day} ${
                day === selectedDay ? styles.selectedDay : ""
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <h2>День {day}</h2>
              <p>Дохід: {dayIncome} грн</p>
              <p>Витрати: {dayExpense} грн</p>

              {/* Кнопки + (дохід) і - (витрата) */}
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("income", day);
                  }}
                  className={styles.plusButton}
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("expense", day);
                  }}
                  className={styles.minusButton}
                >
                  -
                </button>
              </div>

              {/* Список записів дня (опис + сума) */}
              {recordsOfTheDay.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <strong>Записи:</strong>
                  <ul className={styles.recordsList}>
                    {recordsOfTheDay.map((record) => (
                      <li key={record.id} className={styles.recordItem}>
                        <span
                          style={{
                            color: record.type === "income" ? "green" : "red",
                          }}
                        >
                          {record.description}: {record.amount} грн
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Підсумок по вибраному дню */}
      <div className={styles.summary} style={{ marginTop: "30px" }}>
        <h2>День {selectedDay}</h2>
        <p>Загальний дохід: {totalIncome} грн</p>
        <p>Загальні витрати: {totalExpense} грн</p>
        <p>
          Баланс:{" "}
          <strong style={{ color: balance >= 0 ? "green" : "red" }}>
            {balance} грн
          </strong>
        </p>
      </div>

      {/* Підсумок за всі дні (місячний) */}
      <div className={styles.summary} style={{ marginTop: "30px" }}>
        <h2>Загальний підсумок (за {TOTAL_DAYS} днів)</h2>
        <p>Доходи: {totalMonthIncome} грн</p>
        <p>Витрати: {totalMonthExpense} грн</p>
        <p>
          Баланс:{" "}
          <strong
            style={{
              color: totalMonthBalance >= 0 ? "green" : "red",
            }}
          >
            {totalMonthBalance} грн
          </strong>
        </p>
      </div>

      {/* Окремі списки доходів/витрат за вибраний день (Ваша стара логіка) */}
      <div style={{ marginTop: "20px" }}>
        {/* Доходи */}
        {currentDayData.income.length > 0 && (
          <>
            <h3>Доходи (День {selectedDay}):</h3>
            <ul className={styles.recordsList}>
              {currentDayData.income.map((record) => (
                <li key={record.id} className={styles.recordItem}>
                  <span className={styles.incomeText}>
                    {record.description} : {record.amount} грн
                  </span>
                  <button
                    onClick={() => handleDeleteRecord(record.id, "income")}
                    className={styles.deleteButton}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Витрати */}
        {currentDayData.expense.length > 0 && (
          <>
            <h3>Витрати (День {selectedDay}):</h3>
            <ul className={styles.recordsList}>
              {currentDayData.expense.map((record) => (
                <li key={record.id} className={styles.recordItem}>
                  <span className={styles.expenseText}>
                    {record.description} : {record.amount} грн
                  </span>
                  <button
                    onClick={() => handleDeleteRecord(record.id, "expense")}
                    className={styles.deleteButton}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Модалка */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>
              {modalType === "income" ? "Додати дохід" : "Додати витрату"} (День{" "}
              {selectedDay})
            </h3>
            <input
              type="number"
              placeholder="Сума"
              value={modalInput.amount}
              onChange={(e) =>
                setModalInput({ ...modalInput, amount: e.target.value })
              }
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Опис"
              value={modalInput.description}
              onChange={(e) =>
                setModalInput({ ...modalInput, description: e.target.value })
              }
              className={styles.input}
            />
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleAddRecord} className={styles.addButton}>
                Зберегти
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setModalInput({ amount: "", description: "" });
                }}
                className={styles.deleteButton}
                style={{ marginLeft: "10px" }}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinanceControlPage;
