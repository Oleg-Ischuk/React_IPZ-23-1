import { createContext, useContext, useState } from "react";

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentGameResult, setCurrentGameResult] = useState(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);

  const startGame = () => {
    setIsGameActive(true);
    setCurrentGameResult(null);
  };

  const endGame = (result) => {
    setIsGameActive(false);
    setCurrentGameResult(result);
    setShowEndGameModal(true);
  };

  const closeModal = () => {
    setShowEndGameModal(false);
  };

  return (
    <GameStateContext.Provider
      value={{
        isGameActive,
        currentGameResult,
        showEndGameModal,
        startGame,
        endGame,
        closeModal,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within GameStateProvider");
  }
  return context;
};
