import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Board from "../../components/Board/Board";
import GameInfo from "../../components/GameInfo/GameInfo";
import Button from "../../components/Button/Button";
import ResultsModal from "../../components/ResultsModal/ResultsModal";
import { MdExitToApp } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import { useConnectFour, useBoardClick } from "../../hooks";
import useGameStore from "../../store/gameStore";
import useResultsStore from "../../store/resultsStore";
import { generateUUID } from "../../utils/generateId";
import styles from "./GamePage.module.css";

function GamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { board, currentPlayer, moves, winner, gameOver, makeMove, resetGame } =
    useConnectFour();
  const { handleColumnClick } = useBoardClick(makeMove);
  const { moveTimeLimit, playerOneName, playerTwoName } = useGameStore();
  const { addResult } = useResultsStore();
  const [timeLeft, setTimeLeft] = useState(moveTimeLimit);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [skippedPlayer, setSkippedPlayer] = useState(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const timerRef = useRef(null);
  const isSkippingRef = useRef(false);
  const gameEndedRef = useRef(false);

  useEffect(() => {
    resetGame();
    gameEndedRef.current = false;
    setShowGameOverModal(false);
  }, [searchParams, resetGame]);

  useEffect(() => {
    if (moveTimeLimit === 0 || gameOver) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (showTimeoutMessage) {
      return;
    }

    setTimeLeft(moveTimeLimit);

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
          return moveTimeLimit;
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
  }, [currentPlayer, moveTimeLimit, gameOver, showTimeoutMessage, makeMove]);

  useEffect(() => {
    if (!gameEndedRef.current && gameOver) {
      gameEndedRef.current = true;

      const gameResult = {
        winner: winner || "draw",
        moves,
        userId,
        playerOneName,
        playerTwoName,
      };

      addResult(gameResult);
      setShowGameOverModal(true);
    }
  }, [
    gameOver,
    winner,
    moves,
    userId,
    addResult,
    playerOneName,
    playerTwoName,
  ]);

  const handleCellClick = (row, col) => {
    if (!gameOver && !showTimeoutMessage) {
      const success = handleColumnClick(col);
      if (success) {
        setTimeLeft(moveTimeLimit);
      }
    }
  };

  const handleEndGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const gameResult = {
      winner: "cancelled",
      moves: 0,
      userId,
      playerOneName,
      playerTwoName,
    };

    if (moves > 0) {
      gameResult.winner = currentPlayer === "red" ? "yellow" : "red";
      gameResult.moves = moves;
    }

    addResult(gameResult);
    navigate("/results");
  };

  const handlePlayAgain = () => {
    const newGameId = generateUUID();
    setShowGameOverModal(false);
    navigate(`/game/${newGameId}?new=${Date.now()}`);
  };

  const handleViewResults = () => {
    setShowGameOverModal(false);
    navigate("/results");
  };

  const handleGoHome = () => {
    setShowGameOverModal(false);
    navigate("/");
  };

  const handleCloseModal = () => {
    setShowGameOverModal(false);
    navigate("/results");
  };

  const skippedPlayerName =
    skippedPlayer === "red" ? playerOneName : playerTwoName;

  const currentPlayerName =
    currentPlayer === "red" ? playerOneName : playerTwoName;

  const isDraw = winner === null && gameOver;
  const winnerName = winner === "red" ? playerOneName : playerTwoName;

  return (
    <div className={styles.gamePage}>
      <div className={styles.userIdBadge} title={userId}>
        ID сесії: {userId}
      </div>

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
              timeLeft={moveTimeLimit > 0 ? timeLeft : null}
            />

            <div className={styles.actions}>
              <Button onClick={handleEndGame} variant="danger">
                <MdExitToApp className={styles.icon} /> Завершити гру
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ResultsModal
        isOpen={showGameOverModal}
        onClose={handleCloseModal}
        isDraw={isDraw}
        winnerName={winnerName}
        moves={moves}
        userId={userId}
        onPlayAgain={handlePlayAgain}
        onViewResults={handleViewResults}
        onGoHome={handleGoHome}
      />
    </div>
  );
}

export default GamePage;
