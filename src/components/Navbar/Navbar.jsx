import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>💰 Фінансовий Виклик</h1>
      <ul className={styles.navLinks}>
        <li>
          <a href="#income">Дохід</a>
        </li>
        <li>
          <a href="#expenses">Витрати</a>
        </li>
        <li>
          <a href="#goals">Цілі</a>
        </li>
        <li>
          <a href="#stats">Статистика</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
