import { useNavigate } from "react-router-dom";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
import { useSettings } from "../../context";
import styles from "./SettingsPage.module.css";

function SettingsPage({ onBack }) {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

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

  return (
    <div className={styles.settingsPage}>
      <div className={styles.container}>
        <SettingsForm
          initialValues={settings}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
