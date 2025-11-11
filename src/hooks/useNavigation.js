import { useState, useEffect } from "react";
import { getOrCreateSessionId } from "../utils/generateId";

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setUserId(id);
  }, []);

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
    userId,
    navigateToGame,
    navigateToStart,
    navigateToSettings,
    endGame,
  };
};
