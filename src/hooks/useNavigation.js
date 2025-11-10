import { useState } from "react";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);

  const navigateToGame = () => {
    setCurrentPage("game");
    setGameResult(null);
  };

  const navigateToStart = () => {
    setGameResult(null);
    setCurrentPage("start");
  };

  const navigateToSettings = () => {
    setCurrentPage("settings");
  };

  const endGame = (result) => {
    setGameResult(result);
  };

  return {
    currentPage,
    gameResult,
    navigateToGame,
    navigateToStart,
    navigateToSettings,
    endGame,
  };
};
