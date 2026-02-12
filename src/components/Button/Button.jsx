import styles from "./Button.module.css";

/**
 * Простий кнопковий компонент.
 *
 * @component
 * @param {object} props
 * @param {*} props.children - Вміст кнопки
 * @param {Function} [props.onClick] - Обробник кліку
 * @param {string} [props.variant='primary'] - Варіант стилізації (primary|secondary)
 */
function Button({ children, onClick, variant = "primary" }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
