import { create } from "zustand";
import { db } from "src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  isSignedUp: false,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      set({ currentUser: docSnap.data(), isLoading: false });
    } catch (err) {
      return set({ currentUser: null, isLoading: false });
    }
  },
  setSignedUp: (flag) => {
    set((state) => ({ ...state, isSignedUp: flag }));
  },
}));
