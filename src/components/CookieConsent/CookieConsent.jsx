import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie_consent";

const DEFAULT_CATEGORIES = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
        return;
      }
      const parsed = JSON.parse(saved);
      if (parsed && parsed.categories)
        setCategories({ ...DEFAULT_CATEGORIES, ...parsed.categories });
    } catch (err) {
      console.error(err);
      setVisible(true);
    }
  }, []);

  function persist(consent) {
    const payload = {
      version: 1,
      timestamp: Date.now(),
      ...consent,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setVisible(false);
    setIsModalOpen(false);
  }

  function acceptAll() {
    const allOn = Object.fromEntries(
      Object.keys(DEFAULT_CATEGORIES).map((k) => [k, true]),
    );
    setCategories(allOn);
    persist({ accepted: true, categories: allOn });
  }

  function declineAll() {
    const onlyNecessary = {
      ...DEFAULT_CATEGORIES,
      preferences: false,
      analytics: false,
      marketing: false,
    };
    setCategories(onlyNecessary);
    persist({ accepted: false, rejected: true, categories: onlyNecessary });
  }

  function openSettings() {
    setIsModalOpen(true);
  }

  function saveSettings() {
    const accepted = Object.keys(categories).some(
      (k) => k !== "necessary" && categories[k],
    );
    persist({ accepted, categories });
  }

  function toggleCategory(key) {
    if (key === "necessary") return; // cannot toggle necessary
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  if (!visible) return null;

  return (
    <>
      <div className={styles.banner} role="dialog" aria-live="polite">
        <div className={styles.content}>
          <div className={styles.text}>
            Ми використовуємо cookies для покращення роботи додатку. Докладніше:{" "}
            <a href="/PRIVACY_POLICY.md">Privacy Policy</a>
          </div>
          <div className={styles.actions}>
            <button className={styles.manage} onClick={openSettings}>
              Налаштування
            </button>
            <button className={styles.decline} onClick={declineAll}>
              Відхилити
            </button>
            <button className={styles.accept} onClick={acceptAll}>
              Прийняти все
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3>Налаштування cookies</h3>
          <p>Ви можете обрати які категорії cookie дозволити.</p>
          <div className={styles.categories}>
            {Object.keys(categories).map((key) => (
              <label key={key} className={styles.category}>
                <input
                  type="checkbox"
                  checked={categories[key]}
                  onChange={() => toggleCategory(key)}
                  disabled={key === "necessary"}
                />
                <div className={styles.catInfo}>
                  <div className={styles.catName}>{key}</div>
                  <div className={styles.catDesc}>
                    {key === "necessary" &&
                      "Необхідні куки для коректної роботи сайту."}
                    {key === "preferences" &&
                      "Налаштування користувача та збереження налаштувань."}
                    {key === "analytics" &&
                      "Аналіз використання сайту (анонімні)."}
                    {key === "marketing" &&
                      "Реклама та трекінг на інших ресурсах."}
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className={styles.modalActions}>
            <button className={styles.decline} onClick={declineAll}>
              Відхилити
            </button>
            <button className={styles.save} onClick={saveSettings}>
              Зберегти
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
