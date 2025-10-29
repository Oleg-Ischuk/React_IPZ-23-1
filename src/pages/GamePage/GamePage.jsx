import { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import GameInfo from "../../components/GameInfo/GameInfo";
import Button from "../../components/Button/Button";
import GameEndModal from "../../components/GameEndModal/GameEndModal";
import { MdExitToApp } from "react-icons/md";
import { useConnectFour, useBoardClick } from "../../hooks";
import styles from "./GamePage.module.css";

function GamePage({ onGameEnd }) {
  const { board, currentPlayer, moves, winner, gameOver, makeMove, resetGame } =
    useConnectFour();
  const { handleColumnClick } = useBoardClick(makeMove);
  const [showModal, setShowModal] = useState(false);
  const [modalResult, setModalResult] = useState(null);

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
    if (!gameOver) {
      handleColumnClick(col);
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
    setModalResult(null);
    resetGame();
  };

  const handleMainMenu = () => {
    setShowModal(false);
    setModalResult(null);
    if (modalResult?.winner === "cancelled") {
      onGameEnd({ winner: "cancelled", moves: 0 });
    } else {
      onGameEnd(modalResult);
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
