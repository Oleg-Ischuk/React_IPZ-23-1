import { useCallback } from "react";

export const useBoardClick = (makeMove) => {
  const handleColumnClick = useCallback(
    (col) => {
      makeMove(col);
    },
    [makeMove]
  );

  return { handleColumnClick };
};
