import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { FaTrophy, FaRedo, FaHome, FaHandshake } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import styles from "./ResultsModal.module.css";

function ResultsModal({
  isOpen,
  onClose,
  isDraw,
  winnerName,
  moves,
  userId,
  onPlayAgain,
  onViewResults,
  onGoHome,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.modalIcon}>
          {isDraw ? <FaHandshake /> : <FaTrophy />}
        </div>

        <h2 className={styles.modalTitle}>
          {isDraw ? "Нічия!" : "Гру завершено!"}
        </h2>

        {!isDraw && (
          <div className={styles.modalWinner}>
            <GiToken className={styles.modalWinnerIcon} />
            <span>
              Переможець: <strong>{winnerName}</strong>
            </span>
          </div>
        )}

        <div className={styles.modalStats}>
          <p>
            Зроблено ходів: <strong>{moves}</strong>
          </p>
          <p>
            ID сесії: <span className={styles.modalSessionId}>{userId}</span>
          </p>
        </div>

        <div className={styles.modalActions}>
          <Button onClick={onPlayAgain} variant="primary">
            <FaRedo /> Грати знову
          </Button>
          <Button onClick={onViewResults} variant="secondary">
            <FaTrophy /> Переглянути результати
          </Button>
          <Button onClick={onGoHome} variant="secondary">
            <FaHome /> Головне меню
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ResultsModal;
