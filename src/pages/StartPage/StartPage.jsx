import Button from "../../components/Button/Button";
import { FaGamepad, FaInfoCircle } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import styles from "./StartPage.module.css";

function StartPage({ onStartGame }) {
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
        <Button onClick={onStartGame} variant="primary">
          <FaGamepad /> Почати гру
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
