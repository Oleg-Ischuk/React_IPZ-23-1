import { useNavigate } from "react-router-dom";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
import useGameStore from "../../store/gameStore";
import styles from "./SettingsPage.module.css";

function SettingsPage({ onBack }) {
  const navigate = useNavigate();
  const {
    difficulty,
    moveTimeLimit,
    playerOneName,
    playerTwoName,
    updateSettings,
  } = useGameStore();

  const handleSubmit = (values) => {
    updateSettings(values);
    if (onBack) {
      onBack();
    }
    navigate("/");
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    }
    navigate("/");
  };

  const initialValues = {
    difficulty,
    moveTimeLimit,
    playerOneName,
    playerTwoName,
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.container}>
        <SettingsForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
