import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateSessionId } from "../utils/generateId";

export const useNavigation = () => {
  const navigate = useNavigate();
  const [gameResult, setGameResult] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setUserId(id);
  }, []);

  const navigateToGame = () => {
    setGameResult(null);
    if (userId) {
      navigate(`/game/${userId}?new=${Date.now()}`);
    }
  };

  const navigateToStart = () => {
    setGameResult(null);
    navigate("/");
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const endGame = (result) => {
    setGameResult(result);
  };

  return {
    gameResult,
    userId,
    navigateToGame,
    navigateToStart,
    navigateToSettings,
    endGame,
  };
};
