import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateUUID } from "../utils/generateId";

export const useNavigation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [gameResult, setGameResult] = useState(null);

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
    const newGameId = generateUUID();
    console.log("🎮 Створено новий ID для гри:", newGameId);
    navigate(`/game/${newGameId}?new=${Date.now()}`);
  }, [navigate]);

  const navigateToStart = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const navigateToSettings = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  const endGame = useCallback(
    (result) => {
      console.log("🏁 Завершення гри з результатом:", result);
      const resultString = encodeURIComponent(JSON.stringify(result));
      navigate(`/results/${result.userId}?result=${resultString}`);
    },
    [navigate]
  );

  return {
    gameResult,
    navigateToGame,
    navigateToStart,
    navigateToSettings,
    endGame,
  };
};
