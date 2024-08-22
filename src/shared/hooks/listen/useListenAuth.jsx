import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/lib/firebase";

import { useUserStore } from "src/store/userStore";

export const useListenAuth = () => {
  const { setUserId } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [setUserId]);
};
