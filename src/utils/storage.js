const STORAGE_KEY = "connectFourSettings";

export const saveSettings = async (settings) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

export const loadSettings = async () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  } catch (error) {
    console.error("Failed to load settings:", error);
    return null;
  }
};

export const clearSettings = async () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to clear settings:", error);
  }
};
