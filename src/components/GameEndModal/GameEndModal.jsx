import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { FaTrophy, FaRedo, FaHome, FaHandshake, FaBan } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { useSettings } from "../../context";
import styles from "./GameEndModal.module.css";

function GameEndModal({ isOpen, onClose, result, onRestart, onMainMenu }) {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.icon}>
          {isCancelled ? <FaBan /> : isDraw ? <FaHandshake /> : <FaTrophy />}
        </div>

        <h2 className={styles.title}>
          {isCancelled
            ? "Гру скасовано!"
            : isDraw
            ? "Нічия!"
            : "Гру завершено!"}
        </h2>

        {!isCancelled && !isDraw && (
          <div className={styles.winner}>
            <GiToken className={styles.token} />
            <span className={`${styles.winnerText} ${styles[result?.winner]}`}>
              Переможець: {winnerName}
            </span>
          </div>
        )}

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Зроблено ходів:</span>
            <span className={styles.statValue}>{result?.moves || 0}</span>
          </div>
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
    </Modal>
  );
}

export default GameEndModal;
