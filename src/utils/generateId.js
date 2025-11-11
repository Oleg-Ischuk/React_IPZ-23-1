export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getOrCreateSessionId = () => {
  let sessionId = sessionStorage.getItem("gameSessionId");
  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem("gameSessionId", sessionId);
  }
  return sessionId;
};

export const clearSessionId = () => {
  sessionStorage.removeItem("gameSessionId");
};
