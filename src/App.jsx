import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import FinanceControlPage from "./pages/FinanceControlPage.jsx";
import CryptoPage from "./pages/CryptoPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  // Використовуємо локальний стан для примусового оновлення
  const [resetKey, setResetKey] = useState(0);

  // Функція для скидання даних
  const handleResetLocalStorage = () => {
    const confirmReset = window.confirm(
      "Ви впевнені, що хочете скинути всі дані?"
    );
    if (confirmReset) {
      localStorage.clear();
      setResetKey((prevKey) => prevKey + 1); // Примусове оновлення компоненту через зміну ключа
    }
  };

  return (
    <Router>
      <div className="app-container" key={resetKey}>
        {/* Навігація */}
        <Navbar />

        {/* Основний контент */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/control" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/control" element={<FinanceControlPage />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Кнопка для скидання */}
          <div className="reset-container">
            <button className="reset-button" onClick={handleResetLocalStorage}>
              Скинути всі дані
            </button>
          </div>
        </main>

        {/* Футер */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
