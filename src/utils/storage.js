const STORAGE_KEY = "connectFourSettings";

export const saveSettings = async (settings) => {
  try {
    if (typeof window !== "undefined" && window.storage) {
      await window.storage.set(STORAGE_KEY, JSON.stringify(settings));
    }
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

export const loadSettings = async () => {
  try {
    if (typeof window !== "undefined" && window.storage) {
      const result = await window.storage.get(STORAGE_KEY);
      return result ? JSON.parse(result.value) : null;
    }
    return null;
  } catch (error) {
    console.error("Failed to load settings:", error);
    return null;
  }
};

export const clearSettings = async () => {
  try {
    if (typeof window !== "undefined" && window.storage) {
      await window.storage.delete(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to clear settings:", error);
  }
};
