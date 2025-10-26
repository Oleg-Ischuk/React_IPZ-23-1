import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import { useNavigation } from "./hooks";
import styles from "./App.module.css";

function App() {
  const {
    currentPage,
    gameResult,
    navigateToGame,
    navigateToResults,
    navigateToStart,
  } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case "start":
        return <StartPage onStartGame={navigateToGame} />;
      case "game":
        return <GamePage onGameEnd={navigateToResults} />;
      case "results":
        return <ResultsPage result={gameResult} onRestart={navigateToStart} />;
      default:
        return <StartPage onStartGame={navigateToGame} />;
    }
  };

  return <div className={styles.app}>{renderPage()}</div>;
}

export default App;
