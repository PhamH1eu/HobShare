import { create } from "zustand";

export const useInfoShowStore = create((set) => ({
  isShow: false,
  showInfo: () => set((state) => ({ isShow: !state.isShow })),
}));
