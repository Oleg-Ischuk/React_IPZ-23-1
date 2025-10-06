import Cell from "../Cell/Cell";
import styles from "./Board.module.css";

function Board({ board, onCellClick }) {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
