import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  function acceptAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true }));
    setVisible(false);
  }

  function manage() {
    // placeholder: could open a modal with granular settings
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite">
      <div className={styles.content}>
        <div className={styles.text}>
          Мы используем cookies для улучшения работы приложения. Подробнее: <a href="/PRIVACY_POLICY.md">Privacy Policy</a>
        </div>
        <div className={styles.actions}>
          <button className={styles.manage} onClick={manage}>
            Настройки
          </button>
          <button className={styles.accept} onClick={acceptAll}>
            Принять все
          </button>
        </div>
      </div>
    </div>
  );
}
