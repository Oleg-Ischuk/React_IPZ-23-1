import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { useNavigation } from "./hooks";
import styles from "./App.module.css";

function App() {
  const { navigateToGame, navigateToStart, navigateToSettings } =
    useNavigation();

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              onStartGame={navigateToGame}
              onOpenSettings={navigateToSettings}
            />
          }
        />
        <Route path="/game/:userId" element={<GamePage />} />
        <Route
          path="/results"
          element={<ResultsPage onMainMenu={navigateToStart} />}
        />
        <Route
          path="/settings"
          element={<SettingsPage onBack={navigateToStart} />}
        />
        <Route
          path="*"
          element={
            <StartPage
              onStartGame={navigateToGame}
              onOpenSettings={navigateToSettings}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
