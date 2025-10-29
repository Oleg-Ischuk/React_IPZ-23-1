import { useEffect, useState, useRef } from "react";
import Board from "../../components/Board/Board";
import GameInfo from "../../components/GameInfo/GameInfo";
import Button from "../../components/Button/Button";
import GameEndModal from "../../components/GameEndModal/GameEndModal";
import { MdExitToApp } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { useConnectFour, useBoardClick } from "../../hooks";
import { useSettings } from "../../context";
import styles from "./GamePage.module.css";

function GamePage({ onGameEnd }) {
  const { board, currentPlayer, moves, winner, gameOver, makeMove, resetGame } =
    useConnectFour();
  const { handleColumnClick } = useBoardClick(makeMove);
  const { settings } = useSettings();
  const [showModal, setShowModal] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(settings.moveTimeLimit);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [skippedPlayer, setSkippedPlayer] = useState(null);
  const timerRef = useRef(null);
  const isSkippingRef = useRef(false);

  useEffect(() => {
    if (settings.moveTimeLimit === 0 || gameOver) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (showTimeoutMessage) {
      return;
    }

    setTimeLeft(settings.moveTimeLimit);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!isSkippingRef.current) {
            isSkippingRef.current = true;
            clearInterval(timerRef.current);
            timerRef.current = null;

            const playerWhoSkipped = currentPlayer;
            setSkippedPlayer(playerWhoSkipped);
            setShowTimeoutMessage(true);

            if (!gameOver) {
              makeMove(-1);
            }

            setTimeout(() => {
              setShowTimeoutMessage(false);
              setSkippedPlayer(null);
              isSkippingRef.current = false;
            }, 2000);
          }
          return settings.moveTimeLimit;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [
    currentPlayer,
    settings.moveTimeLimit,
    gameOver,
    showTimeoutMessage,
    makeMove,
  ]);

  useEffect(() => {
    if (gameOver && winner) {
      setModalResult({ winner: winner, moves });
      setShowModal(true);
    } else if (gameOver && !winner && moves > 0) {
      setModalResult({ winner: "draw", moves });
      setShowModal(true);
    }
  }, [gameOver, winner, moves]);

  const handleCellClick = (row, col) => {
    if (!gameOver && !showTimeoutMessage) {
      const success = handleColumnClick(col);
      if (success) {
        setTimeLeft(settings.moveTimeLimit);
      }
    }
  };

  const handleEndGame = () => {
    if (moves === 0) {
      setModalResult({ winner: "cancelled", moves: 0 });
      setShowModal(true);
    } else {
      const winnerPlayer = currentPlayer === "red" ? "yellow" : "red";
      setModalResult({ winner: winnerPlayer, moves });
      setShowModal(true);
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setTimeLeft(settings.moveTimeLimit);
    setShowTimeoutMessage(false);
    setSkippedPlayer(null);
    isSkippingRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    resetGame();
    setModalResult(null);
  };

  const handleMainMenu = () => {
    const resultToSend = modalResult;

    setShowModal(false);
    setModalResult(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onGameEnd(resultToSend);
  };

  const skippedPlayerName =
    skippedPlayer === "red" ? settings.playerOneName : settings.playerTwoName;

  const currentPlayerName =
    currentPlayer === "red" ? settings.playerOneName : settings.playerTwoName;

  return (
    <div className={styles.gamePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Гра в розпалі</h1>

        {showTimeoutMessage && (
          <div className={styles.timeoutMessage}>
            <FaHourglassHalf className={styles.timeoutIcon} />
            <p className={styles.timeoutTitle}>
              {skippedPlayerName} пропустив хід!
            </p>
            <p className={styles.timeoutSubtitle}>
              Наступний хід: {currentPlayerName}
            </p>
          </div>
        )}

        <div className={styles.gameContent}>
          <Board board={board} onCellClick={handleCellClick} />

          <div className={styles.sidebar}>
            <GameInfo
              currentPlayer={currentPlayer}
              moves={moves}
              timeLeft={settings.moveTimeLimit > 0 ? timeLeft : null}
            />

            <div className={styles.actions}>
              <Button onClick={handleEndGame} variant="danger">
                <MdExitToApp className={styles.icon} /> Завершити гру
              </Button>
            </div>
          </div>
        </div>
      </div>

      <GameEndModal
        isOpen={showModal}
        onClose={handleRestart}
        result={modalResult}
        onRestart={handleRestart}
        onMainMenu={handleMainMenu}
      />
    </div>
  );
}

export default GamePage;
