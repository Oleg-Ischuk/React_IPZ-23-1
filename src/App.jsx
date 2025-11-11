import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { useNavigation } from "./hooks";
import styles from "./App.module.css";

function App() {
  const {
    currentPage,
    gameResult,
    userId,
    navigateToGame,
    navigateToStart,
    navigateToSettings,
    endGame,
  } = useNavigation();

  const showResults = gameResult !== null;

  const renderPage = () => {
    switch (currentPage) {
      case "start":
        return (
          <StartPage
            onStartGame={navigateToGame}
            onOpenSettings={navigateToSettings}
          />
        );
      case "game":
        return (
          <>
            <GamePage onGameEnd={endGame} userId={userId} />
            {showResults && (
              <ResultsPage
                result={gameResult}
                onRestart={navigateToGame}
                onMainMenu={navigateToStart}
                userId={userId}
              />
            )}
          </>
        );
      case "settings":
        return <SettingsPage onBack={navigateToStart} />;
      default:
        return (
          <StartPage
            onStartGame={navigateToGame}
            onOpenSettings={navigateToSettings}
          />
        );
    }
  };

  return <div className={styles.app}>{renderPage()}</div>;
}

export default App;
