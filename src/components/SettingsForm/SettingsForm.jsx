import { Formik, Form, Field } from "formik";
import { FaCog } from "react-icons/fa";
import { settingsValidationSchema } from "../../utils/validation";
import {
  DIFFICULTY_LEVELS,
  ANIMATION_SPEEDS,
} from "../../constants/gameSettings";
import Button from "../Button/Button";
import styles from "./SettingsForm.module.css";

function SettingsForm({ initialValues, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={settingsValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>
            <FaCog /> Налаштування гри
          </h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Рівень складності</label>
            <div className={styles.radioGroup}>
              {Object.values(DIFFICULTY_LEVELS).map((level) => (
                <label key={level.value} className={styles.radioLabel}>
                  <Field
                    type="radio"
                    name="difficulty"
                    value={level.value}
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>{level.label}</span>
                  <span className={styles.radioDetails}>
                    ({level.rows}x{level.cols})
                  </span>
                </label>
              ))}
            </div>
            {errors.difficulty && touched.difficulty && (
              <div className={styles.error}>{errors.difficulty}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Швидкість анімації</label>
            <div className={styles.radioGroup}>
              {Object.values(ANIMATION_SPEEDS).map((speed) => (
                <label key={speed.value} className={styles.radioLabel}>
                  <Field
                    type="radio"
                    name="animationSpeed"
                    value={speed.value}
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>{speed.label}</span>
                </label>
              ))}
            </div>
            {errors.animationSpeed && touched.animationSpeed && (
              <div className={styles.error}>{errors.animationSpeed}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ім'я першого гравця</label>
            <Field
              type="text"
              name="playerOneName"
              className={styles.input}
              placeholder="Червоний"
            />
            {errors.playerOneName && touched.playerOneName && (
              <div className={styles.error}>{errors.playerOneName}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ім'я другого гравця</label>
            <Field
              type="text"
              name="playerTwoName"
              className={styles.input}
              placeholder="Жовтий"
            />
            {errors.playerTwoName && touched.playerTwoName && (
              <div className={styles.error}>{errors.playerTwoName}</div>
            )}
          </div>

          <div className={styles.actions}>
            <Button type="submit" variant="primary">
              Зберегти
            </Button>
            {onCancel && (
              <Button type="button" onClick={onCancel} variant="secondary">
                Скасувати
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SettingsForm;
