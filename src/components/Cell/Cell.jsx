import styles from "./Cell.module.css";

function Cell({ value, onClick }) {
  return (
    <div className={styles.cell} onClick={onClick}>
      <div className={`${styles.chip} ${styles[value]}`}></div>
    </div>
  );
}

export default Cell;
