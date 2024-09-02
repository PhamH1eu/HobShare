import { useEffect } from "react";
import {
  onSnapshot,
  doc,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

import toast from "react-hot-toast";
import { NotifiComponent } from "src/shared/components/noti/NotifiComponent";

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

const checkTime = (firestoreTimestamp) => {
  const targetTime = firestoreTimestamp.toDate();
  const currentTime = new Date();
  // @ts-ignore
  const differenceInMilliseconds = currentTime - targetTime;

  // Convert milliseconds to seconds
  const differenceInSeconds = differenceInMilliseconds / 1000;

  // Check if the difference is less than 60 seconds (1 minute)
  return differenceInSeconds < 30;
};

export const useListenFirstNoti = (currentUserId) => {
  useEffect(() => {
    const q = query(
      collection(db, `notifications/${currentUserId}/notifications`),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unSub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        //compare the doc created time with present, if it is less than 1 min, show the notification

        const newNoti = change.doc.data();

        if (checkTime(newNoti.createdAt) && change.type === "added") {
          toast((t) => (
            <NotifiComponent
              message={{
                ...newNoti,
                id: newNoti.id,
              }}
              t={t}
            />
          ));
        }
      });
    });

    return () => {
      unSub();
    };
  }, [currentUserId]);
};

export default useListenNotifications;
