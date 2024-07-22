import { create } from "zustand";

type Store = {
  count: number;
  increment: () => void;
};

export const useStore = create<Store>()((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
