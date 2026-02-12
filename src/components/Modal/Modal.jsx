import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./Modal.module.css";

/**
 * Модальне вікно — рендериться в портал при `isOpen`.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Показувати модальне вікно
 * @param {Function} props.onClose - Закрити модальне вікно
 * @param {*} props.children - Вміст модального вікна
 */
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
