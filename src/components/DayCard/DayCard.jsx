import styles from "./DayCard.module.css";

function DayCard({ day, selected, onClick, income, expense, onEdit }) {
  return (
    <div
      className={`${styles.day} ${selected ? styles.selectedDay : ""}`}
      onClick={onClick}
    >
      <div className={styles.dayNumber}>{day}</div>
      <div className={styles.amounts}>
        <span className={styles.income}>Income: {income || 0} грн</span>
        <span className={styles.expense}>Expense: {expense || 0} грн</span>
      </div>
      <button
        className={styles.editButton}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        Редагувати
      </button>
    </div>
  );
}

export default DayCard;
