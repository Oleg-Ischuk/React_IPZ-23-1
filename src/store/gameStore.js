import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameStore = create(
  persist(
    (set) => ({
      difficulty: "medium",
      moveTimeLimit: 0,
      playerOneName: "Червоний",
      playerTwoName: "Жовтий",

      setDifficulty: (difficulty) => set({ difficulty }),
      setMoveTimeLimit: (moveTimeLimit) => set({ moveTimeLimit }),
      setPlayerOneName: (playerOneName) => set({ playerOneName }),
      setPlayerTwoName: (playerTwoName) => set({ playerTwoName }),

      updateSettings: (settings) => set(settings),

      resetSettings: () =>
        set({
          difficulty: "medium",
          moveTimeLimit: 0,
          playerOneName: "Червоний",
          playerTwoName: "Жовтий",
        }),
    }),
    {
      name: "connect-four-settings",
    }
  )
);

export default useGameStore;
