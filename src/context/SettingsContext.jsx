import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_SETTINGS } from "../constants/gameSettings";
import { saveSettings, loadSettings } from "../utils/storage";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = loadSettings();
    return saved || DEFAULT_SETTINGS;
  });

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
