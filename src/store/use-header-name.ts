import { create } from "zustand";

type Props = {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
};

export const useHeaderTitle = create<Props>()((set) => ({
  headerTitle: "",
  setHeaderTitle: (title) => set((state) => ({ headerTitle: title })),
}));
