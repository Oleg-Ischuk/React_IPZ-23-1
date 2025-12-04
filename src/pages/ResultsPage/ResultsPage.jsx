import { useNavigate } from "react-router-dom";
import ResultsTable from "../../components/ResultsTable/ResultsTable";
import Button from "../../components/Button/Button";
import { FaHome } from "react-icons/fa";
import styles from "./ResultsPage.module.css";

function ResultsPage({ onMainMenu }) {
  const navigate = useNavigate();

  const handleMainMenu = () => {
    if (onMainMenu) {
      onMainMenu();
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.resultsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Таблиця результатів</h1>
          <p className={styles.subtitle}>
            Тут зібрані результати всіх ваших ігор
          </p>
        </div>

        <ResultsTable />

        <div className={styles.actions}>
          <Button onClick={handleMainMenu} variant="primary">
            <FaHome /> Головне меню
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
