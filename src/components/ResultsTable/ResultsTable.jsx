import { FaTrash } from "react-icons/fa";
import useResultsStore from "../../store/resultsStore";
import styles from "./ResultsTable.module.css";

function ResultsTable() {
  const { results, removeResult, clearResults } = useResultsStore();

  const getWinnerName = (result) => {
    if (result.winner === "draw") return "Нічия";
    if (result.winner === "cancelled") return "Скасовано";
    if (result.winner === "red") return result.playerOneName || "Червоний";
    if (result.winner === "yellow") return result.playerTwoName || "Жовтий";
    return "N/A";
  };

  const handleDeleteResult = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей результат?")) {
      removeResult(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Ви впевнені, що хочете видалити ВСІ результати?")) {
      clearResults();
    }
  };

  return (
    <div className={styles.resultsTable}>
      <h2 className={styles.tableTitle}>Таблиця результатів</h2>

      {results.length > 0 ? (
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>ID сесії</th>
                  <th>Переможець</th>
                  <th>Ходів</th>
                  <th>Час</th>
                  <th>Дія</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={result.id} className={styles.tableRow}>
                    <td className={styles.numberCell}>{index + 1}</td>
                    <td className={styles.sessionIdCell}>{result.userId}</td>
                    <td className={styles.winnerCell}>
                      <span className={styles.winnerBadge}>
                        {getWinnerName(result)}
                      </span>
                    </td>
                    <td className={styles.movesCell}>{result.moves}</td>
                    <td className={styles.timeCell}>{result.timestamp}</td>
                    <td className={styles.actionCell}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteResult(result.id)}
                        title="Видалити результат"
                        aria-label="Видалити результат"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {results.length > 0 && (
            <div className={styles.buttonContainer}>
              <button className={styles.clearButton} onClick={handleClearAll}>
                Очистити всі результати
              </button>
              <span className={styles.resultCount}>
                Всього результатів: {results.length}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.noResults}>Немає результатів</p>
          <p className={styles.emptyMessage}>
            Граючи, результати будуть з'являтися тут
          </p>
        </div>
      )}
    </div>
  );
}

export default ResultsTable;
