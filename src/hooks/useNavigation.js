import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOrCreateSessionId } from "../utils/generateId";

export const useNavigation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [gameResult, setGameResult] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setUserId(id);
  }, []);

  useEffect(() => {
    const result = searchParams.get("result");
    if (result) {
      try {
        setGameResult(JSON.parse(decodeURIComponent(result)));
      } catch (e) {
        console.error("Failed to parse game result:", e);
      }
    }
  }, [searchParams]);

  const navigateToGame = useCallback(() => {
    if (userId) {
      navigate(`/game/${userId}?new=${Date.now()}`);
    }
  }, [userId, navigate]);

  const navigateToStart = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const navigateToSettings = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  const endGame = useCallback(
    (result) => {
      const resultString = encodeURIComponent(JSON.stringify(result));
      navigate(`/results/${result.userId}?result=${resultString}`);
    },
    [navigate]
  );

  return {
    gameResult,
    userId,
    navigateToGame,
    navigateToStart,
    navigateToSettings,
    endGame,
  };
};
