import { create } from "zustand";

export const useInfoShowStore = create((set) => ({
  isShow: true,
  showInfo: () => set((state) => ({ isShow: !state.isShow })),
}));
