import Button from "../../components/Button/Button";
import { FaGamepad, FaInfoCircle, FaCog } from "react-icons/fa";
import styles from "./StartPage.module.css";

function StartPage({ onStartGame, onOpenSettings }) {
  return (
    <div className={styles.startPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Чотири в ряд</h1>
        <p className={styles.subtitle}>Connect Four</p>
        <div className={styles.rules}>
          <h3>
            <FaInfoCircle /> Правила гри:
          </h3>
          <ul>
            <li>Гравці по черзі кидають фішки у стовпці</li>
            <li>Фішка падає на найнижче вільне місце</li>
            <li>Мета: зібрати 4 фішки в ряд</li>
            <li>Переможець той, хто перший зібрав 4 в ряд</li>
          </ul>
        </div>
        <div className={styles.actions}>
          <Button onClick={onStartGame} variant="primary">
            <FaGamepad /> Почати гру
          </Button>
          <Button onClick={onOpenSettings} variant="secondary">
            <FaCog /> Налаштування
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
