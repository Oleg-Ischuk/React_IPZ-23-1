import { useEffect } from "react";
import Board from "../../components/Board/Board";
import GameInfo from "../../components/GameInfo/GameInfo";
import Button from "../../components/Button/Button";
import { MdExitToApp } from "react-icons/md";
import { useConnectFour, useBoardClick } from "../../hooks";
import styles from "./GamePage.module.css";

function GamePage({ onGameEnd }) {
  const { board, currentPlayer, moves, winner, gameOver, makeMove, resetGame } =
    useConnectFour();
  const { handleColumnClick } = useBoardClick(makeMove);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        onGameEnd({ winner: winner || "draw", moves });
        resetGame();
      }, 1000);
    }
  }, [gameOver, winner, moves, onGameEnd, resetGame]);

  const handleCellClick = (row, col) => {
    handleColumnClick(col);
  };

  const handleEndGame = () => {
    if (moves === 0) {
      onGameEnd({ winner: "cancelled", moves: 0 });
    } else {
      const winnerPlayer = currentPlayer === "red" ? "yellow" : "red";
      onGameEnd({ winner: winnerPlayer, moves });
    }
  };

  return (
    <div className={styles.gamePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Гра в розпалі</h1>

        <div className={styles.gameContent}>
          <Board board={board} onCellClick={handleCellClick} />

          <div className={styles.sidebar}>
            <GameInfo currentPlayer={currentPlayer} moves={moves} />

            <div className={styles.actions}>
              <Button onClick={handleEndGame} variant="danger">
                <MdExitToApp className={styles.icon} /> Завершити гру
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
