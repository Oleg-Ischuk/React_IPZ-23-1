import { useState, useCallback } from "react";

const ROWS = 6;
const COLS = 7;

export const useConnectFour = () => {
  const [board, setBoard] = useState(() =>
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill("empty"))
  );
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = useCallback((board, row, col, player) => {
    const directions = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
    ];

    for (let { row: dRow, col: dCol } of directions) {
      let count = 1;

      for (let i = 1; i < 4; i++) {
        const newRow = row + dRow * i;
        const newCol = col + dCol * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      for (let i = 1; i < 4; i++) {
        const newRow = row - dRow * i;
        const newCol = col - dCol * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  }, []);

  const makeMove = useCallback(
    (col) => {
      if (gameOver || col < 0 || col >= COLS) {
        return false;
      }

      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === "empty") {
          const newBoard = board.map((r) => [...r]);
          newBoard[row][col] = currentPlayer;
          setBoard(newBoard);
          setMoves((prev) => prev + 1);

          if (checkWinner(newBoard, row, col, currentPlayer)) {
            setWinner(currentPlayer);
            setGameOver(true);
          } else if (moves + 1 >= ROWS * COLS) {
            setGameOver(true);
          } else {
            setCurrentPlayer((prev) => (prev === "red" ? "yellow" : "red"));
          }

          return true;
        }
      }

      return false;
    },
    [board, currentPlayer, gameOver, moves, checkWinner]
  );

  const resetGame = useCallback(() => {
    setBoard(
      Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill("empty"))
    );
    setCurrentPlayer("red");
    setMoves(0);
    setWinner(null);
    setGameOver(false);
  }, []);

  return {
    board,
    currentPlayer,
    moves,
    winner,
    gameOver,
    makeMove,
    resetGame,
  };
};
