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
  // Функція для скидання даних
  const handleResetLocalStorage = () => {
    const confirmReset = window.confirm(
      "Ви впевнені, що хочете скинути всі дані?"
    );
    if (confirmReset) {
      localStorage.clear();
      window.location.reload(); // Оновлює сторінку після скидання
    }
  };

  return (
    <Router>
      <div className="app-container">
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
