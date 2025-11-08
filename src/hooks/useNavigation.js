import { useState } from "react";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);

  const navigateToGame = () => {
    setCurrentPage("game");
    setIsGameActive(true);
    setGameResult(null);
  };

  const navigateToResults = (result) => {
    setGameResult(result);
    setIsGameActive(false);
    setCurrentPage("results");
  };

  const navigateToStart = () => {
    setGameResult(null);
    setIsGameActive(false);
    setCurrentPage("start");
  };

  const navigateToSettings = () => {
    setCurrentPage("settings");
  };

  const endGame = (result) => {
    setIsGameActive(false);
    setGameResult(result);
    setCurrentPage("results");
  };

  return {
    currentPage,
    gameResult,
    isGameActive,
    navigateToGame,
    navigateToResults,
    navigateToStart,
    navigateToSettings,
    endGame,
  };
};
