import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/income"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        Дохід
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        Витрати
      </NavLink>
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
    </nav>
  );
}

export default Navbar;
