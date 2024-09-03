import { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "src/lib/firebase";

//listen to chat
export const useListenNotifications = (currentUserId, setUnreadNotis) => {
  useEffect(() => {
    const q = doc(db, `notifications/${currentUserId}`);
    const unSub = onSnapshot(q, (querySnapshot) => {
      const unreadChatCount =
        querySnapshot.data().unreadNotis > 5
          ? "5+"
          : querySnapshot.data().unreadNotis;

      setUnreadNotis(unreadChatCount);
    });

    return () => {
      unSub();
    };
  }, [currentUserId]);
};

export default useListenNotifications;
