import * as Yup from "yup";

export const settingsValidationSchema = Yup.object({
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Виберіть рівень складності")
    .required("Рівень складності обов'язковий"),
  animationSpeed: Yup.string()
    .oneOf(["slow", "normal", "fast"], "Виберіть швидкість анімації")
    .required("Швидкість анімації обов'язкова"),
  playerOneName: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(20, "Максимум 20 символів")
    .required("Ім'я гравця обов'язкове"),
  playerTwoName: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(20, "Максимум 20 символів")
    .required("Ім'я гравця обов'язкове"),
});
