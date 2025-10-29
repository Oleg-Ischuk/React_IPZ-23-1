import { FaUser, FaHashtag } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { useSettings } from "../../context";
import styles from "./GameInfo.module.css";

function GameInfo({ currentPlayer, moves }) {
  const { settings } = useSettings();

  const playerName =
    currentPlayer === "red" ? settings.playerOneName : settings.playerTwoName;

  return (
    <div className={styles.gameInfo}>
      <div className={styles.infoItem}>
        <span className={styles.label}>
          <FaUser /> Поточний гравець:
        </span>
        <span className={`${styles.player} ${styles[currentPlayer]}`}>
          <GiToken />
          {playerName}
        </span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.label}>
          <FaHashtag /> Кількість ходів:
        </span>
        <span className={styles.value}>{moves}</span>
      </div>
    </div>
  );
}

export default GameInfo;
