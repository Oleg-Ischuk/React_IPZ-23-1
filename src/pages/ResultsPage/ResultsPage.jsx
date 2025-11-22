import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import {
  FaTrophy,
  FaRedo,
  FaHashtag,
  FaHandshake,
  FaBan,
  FaHome,
  FaCopy,
} from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { useSettings } from "../../context";
import { useState, useEffect } from "react";
import styles from "./ResultsPage.module.css";

function ResultsPage({ onMainMenu }) {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState(null);

  // Читаємо результат з URL
  useEffect(() => {
    const resultParam = searchParams.get("result");
    if (resultParam) {
      try {
        setResult(JSON.parse(decodeURIComponent(resultParam)));
      } catch (e) {
        console.error("Failed to parse result:", e);
      }
    }
  }, [searchParams]);

  if (!result) {
    return null;
  }

  const isDraw = result.winner === "draw";
  const isCancelled = result.winner === "cancelled";

  const winnerName =
    result.winner === "red"
      ? settings.playerOneName
      : result.winner === "yellow"
      ? settings.playerTwoName
      : "";

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestart = () => {
    navigate(`/game/${userId}?new=${Date.now()}`);
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
                <span className={`${styles.winner} ${styles[result.winner]}`}>
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
                <span className={styles.value}>{result.moves || 0}</span>
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
      </div>
    </div>
  );
}

export default ResultsPage;
