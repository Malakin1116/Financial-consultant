import { useState, useEffect } from "react";

const App = () => {
  const [investments, setInvestments] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0); // Текущее значение суммы
  const [requiredUnits, setRequiredUnits] = useState(0); // Единицы криптовалюты
  const [requiredMoney, setRequiredMoney] = useState(0); // Необходимая сумма

  // Инициализация списка инвестиций
  useEffect(() => {
    const savedInvestments = JSON.parse(localStorage.getItem("investments"));
    if (savedInvestments) {
      setInvestments(savedInvestments);
    } else {
      const initialInvestments = [];
      for (let amount = 250; amount <= 1000; amount += 5) {
        const coefficient = amount > 750 ? 0.1 : 0.2; // Учитываем разный коэффициент
        initialInvestments.push({
          id: amount,
          amount,
          portion: (amount * coefficient).toFixed(2), // Вычисление "частицы"
          status: "waiting", // Возможные статусы: waiting, bought, sold
        });
      }
      setInvestments(initialInvestments);
      localStorage.setItem("investments", JSON.stringify(initialInvestments));
    }
  }, []);

  // Функция для пересчёта единиц и денег
  const calculateFromCurrentAmount = () => {
    let totalUnits = 0;
    let totalMoney = 0;

    for (let amount = currentAmount; amount <= 1000; amount += 5) {
      const coefficient = amount > 750 ? 0.1 : 0.2;
      totalUnits += coefficient; // Добавляем коэффициент как единицы криптовалюты
      totalMoney += amount * coefficient; // Рассчитываем необходимую сумму
    }

    setRequiredUnits(totalUnits.toFixed(2)); // Округляем до двух знаков
    setRequiredMoney(totalMoney.toFixed(2)); // Округляем до двух знаков
  };

  // Обновление статуса и сохранение в LocalStorage
  const updateStatus = (id, status) => {
    const updatedInvestments = investments.map((inv) =>
      inv.id === id ? { ...inv, status } : inv
    );
    setInvestments(updatedInvestments);
    localStorage.setItem("investments", JSON.stringify(updatedInvestments));
  };

  // Функция подсчёта общей суммы с учётом коэффициента
  const calculateWithCoefficient = (status) => {
    return investments
      .filter((inv) => inv.status === status)
      .reduce((total, inv) => {
        const coefficient = inv.amount > 750 ? 0.1 : 0.2; // Учитываем разный коэффициент
        return total + inv.amount * coefficient;
      }, 0)
      .toFixed(2); // Округляем до двух знаков
  };

  const totalBought = calculateWithCoefficient("bought"); // Сумма "Куплено"
  const totalWaiting = calculateWithCoefficient("waiting"); // Сумма "Ожидает"
  const totalSold = calculateWithCoefficient("sold"); // Сумма "Продано"

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Crypto Tracker</h1>

      {/* Ввод текущей суммы */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Введите текущую сумму:{" "}
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(Number(e.target.value))}
            style={{ marginRight: "10px", padding: "5px" }}
          />
        </label>
        <button
          onClick={calculateFromCurrentAmount}
          style={{
            padding: "5px 10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Рассчитать
        </button>
      </div>

      {/* Результаты расчёта */}
      <div style={{ marginBottom: "20px", fontSize: "18px" }}>
        <p>
          <strong>Необходимая сумма:</strong> ${requiredMoney}
        </p>
        <p>
          <strong>Необходимые единицы криптовалюты:</strong> {requiredUnits}
        </p>
      </div>

      {/* Суммы инвестиций */}
      <div style={{ marginBottom: "20px", fontSize: "18px" }}>
        <p>
          <strong>Сумма купленных инвестиций (с учётом коэффициента):</strong> $
          {totalBought}
        </p>
        <p>
          <strong>Сумма ожидающих инвестиций (с учётом коэффициента):</strong> $
          {totalWaiting}
        </p>
        <p>
          <strong>Сумма проданных инвестиций (с учётом коэффициента):</strong> $
          {totalSold}
        </p>
      </div>

      {/* Таблица инвестиций */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Сумма покупки ($)</th>
            <th>Частица ($)</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.amount}</td>
              <td>
                {inv.amount > 750
                  ? (inv.amount * 0.1).toFixed(2)
                  : (inv.amount * 0.2).toFixed(2)}
              </td>
              <td
                style={{
                  color:
                    inv.status === "bought"
                      ? "green"
                      : inv.status === "sold"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {inv.status === "bought"
                  ? "Куплено"
                  : inv.status === "sold"
                  ? "Продано"
                  : "Ожидает"}
              </td>
              <td>
                <button
                  onClick={() => updateStatus(inv.id, "bought")}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    margin: "5px",
                    padding: "5px 10px",
                  }}
                >
                  Куплено
                </button>
                <button
                  onClick={() => updateStatus(inv.id, "sold")}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    margin: "5px",
                    padding: "5px 10px",
                  }}
                >
                  Продано
                </button>
                <button
                  onClick={() => updateStatus(inv.id, "waiting")}
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    margin: "5px",
                    padding: "5px 10px",
                  }}
                >
                  Ожидает
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
