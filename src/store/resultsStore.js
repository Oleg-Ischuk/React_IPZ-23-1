import { create } from "zustand";
import { persist } from "zustand/middleware";

const useResultsStore = create(
  persist(
    (set) => ({
      results: [],

      addResult: (result) =>
        set((state) => ({
          results: [
            ...state.results,
            {
              ...result,
              id: Date.now(),
              timestamp: new Date().toLocaleString("uk-UA"),
            },
          ],
        })),

      removeResult: (id) =>
        set((state) => ({
          results: state.results.filter((result) => result.id !== id),
        })),

      clearResults: () => set({ results: [] }),

      getResults: () => (state) => state.results,
    }),
    {
      name: "connect-four-results",
    }
  )
);

export default useResultsStore;
