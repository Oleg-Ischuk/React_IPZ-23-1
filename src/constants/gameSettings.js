export const DIFFICULTY_LEVELS = {
  EASY: { value: "easy", label: "Легко", rows: 5, cols: 6 },
  MEDIUM: { value: "medium", label: "Середньо", rows: 6, cols: 7 },
  HARD: { value: "hard", label: "Складно", rows: 7, cols: 8 },
};

export const ANIMATION_SPEEDS = {
  SLOW: { value: "slow", label: "Повільна", duration: 1000 },
  NORMAL: { value: "normal", label: "Нормальна", duration: 500 },
  FAST: { value: "fast", label: "Швидка", duration: 200 },
};

export const DEFAULT_SETTINGS = {
  difficulty: "medium",
  animationSpeed: "normal",
  playerOneName: "Червоний",
  playerTwoName: "Жовтий",
};
