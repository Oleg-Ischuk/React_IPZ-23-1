import { useState } from "react";
import Board from "../../components/Board/Board";
import GameInfo from "../../components/GameInfo/GameInfo";
import Button from "../../components/Button/Button";
import { MdExitToApp } from "react-icons/md";
import styles from "./GamePage.module.css";

function GamePage({ onGameEnd }) {
  const initialBoard = Array(6)
    .fill(null)
    .map(() => Array(7).fill("empty"));

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [moves, setMoves] = useState(0);

  const handleCellClick = (row, col) => {
    console.log(`Клік на клітинку: рядок ${row}, колонка ${col}`);
  };

  const handleEndGame = () => {
    onGameEnd({ winner: currentPlayer, moves });
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
