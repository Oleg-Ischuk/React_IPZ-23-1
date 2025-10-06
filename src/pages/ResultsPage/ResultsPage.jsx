import Button from "../../components/Button/Button";
import { FaTrophy, FaRedo, FaHashtag } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import styles from "./ResultsPage.module.css";

function ResultsPage({ result, onRestart }) {
  return (
    <div className={styles.resultsPage}>
      <div className={styles.container}>
        <div className={styles.trophy}>
          <FaTrophy />
        </div>

        <h1 className={styles.title}>Гру завершено!</h1>

        <div className={styles.resultInfo}>
          <div className={styles.resultItem}>
            <span className={styles.label}>
              <GiToken /> Переможець:
            </span>
            <span className={`${styles.winner} ${styles[result?.winner]}`}>
              <GiToken />
              {result?.winner === "red" ? "Червоний" : "Жовтий"}
            </span>
          </div>

          <div className={styles.resultItem}>
            <span className={styles.label}>
              <FaHashtag /> Загальна кількість ходів:
            </span>
            <span className={styles.value}>{result?.moves || 0}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={onRestart} variant="primary">
            <FaRedo /> Нова гра
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
