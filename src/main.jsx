import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SettingsProvider, GameStateProvider } from "./context";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </SettingsProvider>
  </StrictMode>
);
