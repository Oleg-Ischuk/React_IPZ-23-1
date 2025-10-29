import { Formik, Form, Field } from "formik";
import { FaCog } from "react-icons/fa";
import { settingsValidationSchema } from "../../utils/validation";
import {
  DIFFICULTY_LEVELS,
  MOVE_TIME_LIMITS,
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
      {({ errors, touched, values, setFieldValue }) => (
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
            <label className={styles.label}>Ліміт часу на хід</label>
            <div className={styles.radioGroup}>
              {Object.values(MOVE_TIME_LIMITS).map((limit) => (
                <label key={limit.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="moveTimeLimit"
                    value={limit.value}
                    checked={values.moveTimeLimit === limit.value}
                    onChange={() => setFieldValue("moveTimeLimit", limit.value)}
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>{limit.label}</span>
                </label>
              ))}
            </div>
            {errors.moveTimeLimit && touched.moveTimeLimit && (
              <div className={styles.error}>{errors.moveTimeLimit}</div>
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
