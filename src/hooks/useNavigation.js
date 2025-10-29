import { useState } from "react";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);

  const navigateToGame = () => {
    setCurrentPage("game");
  };

  const navigateToResults = (result) => {
    setGameResult(result);
    setCurrentPage("results");
  };

  const navigateToStart = () => {
    setGameResult(null);
    setCurrentPage("start");
  };

  const navigateToSettings = () => {
    setCurrentPage("settings");
  };

  return {
    currentPage,
    gameResult,
    navigateToGame,
    navigateToResults,
    navigateToStart,
    navigateToSettings,
  };
};
