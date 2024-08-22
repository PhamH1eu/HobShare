import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUserId: null,
  isSignedUp: false,
  setUserId: (uid) => {
    set((state) => ({ ...state, currentUserId: uid }));
  },
  setSignedUp: (flag) => {
    set((state) => ({ ...state, isSignedUp: flag }));
  },
}));
