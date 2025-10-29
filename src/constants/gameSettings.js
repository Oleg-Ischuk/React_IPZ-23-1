export const DIFFICULTY_LEVELS = {
  EASY: { value: "easy", label: "Легко", rows: 5, cols: 6 },
  MEDIUM: { value: "medium", label: "Середньо", rows: 6, cols: 7 },
  HARD: { value: "hard", label: "Складно", rows: 7, cols: 8 },
};

export const MOVE_TIME_LIMITS = {
  NONE: { value: 0, label: "Без обмеження" },
  SHORT: { value: 10, label: "10 секунд" },
  MEDIUM: { value: 20, label: "20 секунд" },
  LONG: { value: 30, label: "30 секунд" },
};

export const DEFAULT_SETTINGS = {
  difficulty: "medium",
  moveTimeLimit: 0,
  playerOneName: "Червоний",
  playerTwoName: "Жовтий",
};
