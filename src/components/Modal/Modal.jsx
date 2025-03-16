import styles from "./Modal.module.css";

function Modal({
  isOpen,
  day,
  onClose,
  onSave,
  data,
  onDataChange,
  onDelete,
  incomeCategories,
  expenseCategories,
}) {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave();
  };

  const handleDelete = () => {
    if (window.confirm("Ви впевнені, що хочете видалити цей запис?")) {
      onDelete();
      onClose();
    }
  };

  const setType = (type) => {
    onDataChange({ target: { name: "type", value: type } });
  };

  const categories =
    data.type === "income" ? incomeCategories : expenseCategories;
  const showDescription = data.category === "Інше";

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3>Редагувати (День {day})</h3>
        <div className={styles.typeSelector}>
          <button
            className={`${styles.typeButton} ${
              data.type === "income" ? styles.active : ""
            }`}
            onClick={() => setType("income")}
          >
            <span className={styles.icon}>💰</span> Дохід
          </button>
          <button
            className={`${styles.typeButton} ${
              data.type === "expense" ? styles.active : ""
            }`}
            onClick={() => setType("expense")}
          >
            <span className={styles.icon}>🛒</span> Витрата
          </button>
        </div>
        <input
          type="number"
          placeholder="Сума"
          value={data.amount}
          onChange={onDataChange}
          name="amount"
          className={styles.input}
        />
        <select
          name="category"
          value={data.category}
          onChange={onDataChange}
          className={styles.input}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {showDescription && (
          <input
            type="text"
            placeholder="Опис (необов’язково)"
            value={data.description}
            onChange={onDataChange}
            name="description"
            className={styles.input}
          />
        )}
        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={handleSave}>
            Зберегти
          </button>
          {data.id && (
            <button className={styles.deleteButton} onClick={handleDelete}>
              Видалити
            </button>
          )}
          <button className={styles.cancelButton} onClick={onClose}>
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
