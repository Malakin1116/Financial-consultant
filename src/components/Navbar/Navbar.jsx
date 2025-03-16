import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        Головна
      </NavLink>
      <NavLink
        to="/control"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        Контроль фінансів
      </NavLink>
      <NavLink
        to="/crypto" // Новый маршрут для страницы отслеживания криптовалюты
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        Криптовалюта
      </NavLink>
    </nav>
  );
}

export default Navbar;
