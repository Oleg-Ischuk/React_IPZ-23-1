import * as Yup from "yup";

export const settingsValidationSchema = Yup.object({
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Виберіть рівень складності")
    .required("Рівень складності обов'язковий"),
  moveTimeLimit: Yup.number()
    .min(0, "Мінімум 0 секунд")
    .required("Ліміт часу обов'язковий"),
  playerOneName: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(20, "Максимум 20 символів")
    .required("Ім'я гравця обов'язкове"),
  playerTwoName: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(20, "Максимум 20 символів")
    .required("Ім'я гравця обов'язкове"),
});
