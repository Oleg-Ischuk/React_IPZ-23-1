import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import ResultsTable from "../../components/ResultsTable/ResultsTable";
import {
  FaTrophy,
  FaRedo,
  FaHandshake,
  FaBan,
  FaHome,
  FaCopy,
} from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import useGameStore from "../../store/gameStore";
import useResultsStore from "../../store/resultsStore";
import { useState } from "react";
import { generateUUID } from "../../utils/generateId";
import styles from "./ResultsPage.module.css";

function ResultsPage({ onMainMenu }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { playerOneName, playerTwoName } = useGameStore();
  const { results } = useResultsStore();
  const [copied, setCopied] = useState(false);

  const currentResult = results.find((r) => r.userId === userId);

  useEffect(() => {
    if (!currentResult) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentResult, navigate]);

  if (!currentResult) {
    return (
      <div className={styles.resultsPage}>
        <div className={styles.notFoundContainer}>
          <div className={styles.notFoundContent}>
            <h1 className={styles.notFoundTitle}>Результат не знайдено</h1>
            <p className={styles.notFoundMessage}>
              Результат був видалений або сторінка закрилась
            </p>
            <p className={styles.redirectMessage}>
              Перенаправлення на головне меню через 2 секунди...
            </p>
            <Button onClick={() => navigate("/")} variant="primary">
              <FaHome /> Повернутися на головне меню
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isDraw = currentResult.winner === "draw";
  const isCancelled = currentResult.winner === "cancelled";

  const winnerName =
    currentResult.winner === "red"
      ? playerOneName
      : currentResult.winner === "yellow"
      ? playerTwoName
      : "";

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestart = () => {
    const newGameId = generateUUID();
    console.log("🔄 Перезапуск гри з НОВИМ ID:", newGameId);
    navigate(`/game/${newGameId}?new=${Date.now()}`);
  };

  const handleMainMenu = () => {
    if (onMainMenu) {
      onMainMenu();
    }
  };

  return (
    <div className={styles.resultsPage}>
      <div className={styles.container}>
        <div className={styles.content}>
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
                <span
                  className={`${styles.winner} ${styles[currentResult.winner]}`}
                >
                  <GiToken />
                  {winnerName}
                </span>
              </div>
            )}

            {!isCancelled && (
              <div className={styles.resultItem}>
                <span className={styles.label}>
                  <FaTrophy /> Зроблено ходів:
                </span>
                <span className={styles.value}>{currentResult.moves || 0}</span>
              </div>
            )}

            {isCancelled && (
              <div className={styles.resultItem}>
                <span className={styles.cancelledText}>
                  Гру було скасовано до початку
                </span>
              </div>
            )}

            <div className={styles.sessionInfo}>
              <span className={styles.sessionLabel}>ID сесії:</span>
              <span className={styles.sessionId}>{userId}</span>
              <button
                className={styles.copyButton}
                onClick={handleCopyId}
                title="Копіювати ID"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          {copied && <p className={styles.copiedNotification}>Скопійовано!</p>}

          <div className={styles.actions}>
            <Button onClick={handleRestart} variant="primary">
              <FaRedo /> Грати знову
            </Button>
            <Button onClick={handleMainMenu} variant="secondary">
              <FaHome /> Головне меню
            </Button>
          </div>
        </div>

        <ResultsTable />
      </div>
    </div>
  );
}

export default ResultsPage;
