import { useState } from "react";
import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import styles from "./App.module.css";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameResult, setGameResult] = useState(null);

  const handleStartGame = () => {
    setCurrentPage("game");
  };

  const handleGameEnd = (result) => {
    setGameResult(result);
    setCurrentPage("results");
  };

  const handleRestart = () => {
    setGameResult(null);
    setCurrentPage("start");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "start":
        return <StartPage onStartGame={handleStartGame} />;
      case "game":
        return <GamePage onGameEnd={handleGameEnd} />;
      case "results":
        return <ResultsPage result={gameResult} onRestart={handleRestart} />;
      default:
        return <StartPage onStartGame={handleStartGame} />;
    }
  };

  return <div className={styles.app}>{renderPage()}</div>;
}

export default App;
