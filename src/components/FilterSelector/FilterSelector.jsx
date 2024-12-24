import React from "react";
import styles from "./FilterSelector.module.css";

function FilterSelector({ filter, setFilter }) {
  return (
    <div className={styles.container}>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.select}
      >
        <option value="day">Сьогодні</option>
        <option value="week">Цей тиждень</option>
        <option value="month">Цей місяць</option>
        <option value="all">Всі дані</option>
      </select>
    </div>
  );
}

export default FilterSelector;
