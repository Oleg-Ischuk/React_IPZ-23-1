import SettingsForm from "../../components/SettingsForm/SettingsForm";
import { useSettings } from "../../context";
import styles from "./SettingsPage.module.css";

function SettingsPage({ onBack }) {
  const { settings, updateSettings } = useSettings();

  const handleSubmit = (values) => {
    updateSettings(values);
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.container}>
        <SettingsForm
          initialValues={settings}
          onSubmit={handleSubmit}
          onCancel={onBack}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
