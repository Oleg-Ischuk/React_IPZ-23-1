import Button from "../../components/Button/Button";
import {
  FaTrophy,
  FaRedo,
  FaHashtag,
  FaHandshake,
  FaBan,
  FaHome,
} from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { useSettings } from "../../context";
import styles from "./ResultsPage.module.css";

function ResultsPage({ result, onRestart, onMainMenu }) {
  const { settings } = useSettings();
  const isDraw = result?.winner === "draw";
  const isCancelled = result?.winner === "cancelled";

  const winnerName =
    result?.winner === "red"
      ? settings.playerOneName
      : result?.winner === "yellow"
      ? settings.playerTwoName
      : "";

  return (
    <div className={styles.resultsPage}>
      <div className={styles.container}>
        <div className={styles.trophy}>
          {isCancelled ? <FaBan /> : isDraw ? <FaHandshake /> : <FaTrophy />}
        </div>

        <h1 className={styles.title}>
          {isCancelled
            ? "Гру скасовано!"
            : isDraw
            ? "Нічия!"
            : "Гру завершено!"}
        </h1>

        <div className={styles.resultInfo}>
          {!isDraw && !isCancelled && (
            <div className={styles.resultItem}>
              <span className={styles.label}>
                <GiToken /> Переможець:
              </span>
              <span className={`${styles.winner} ${styles[result?.winner]}`}>
                <GiToken />
                {winnerName}
              </span>
            </div>
          )}

          {!isCancelled && (
            <div className={styles.resultItem}>
              <span className={styles.label}>
                <FaHashtag /> Зроблено ходів:
              </span>
              <span className={styles.value}>{result?.moves || 0}</span>
            </div>
          )}

          {isCancelled && (
            <div className={styles.resultItem}>
              <span className={styles.cancelledText}>
                Гру було скасовано до початку
              </span>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button onClick={onRestart} variant="primary">
            <FaRedo /> Грати знову
          </Button>
          <Button onClick={onMainMenu} variant="secondary">
            <FaHome /> Головне меню
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
