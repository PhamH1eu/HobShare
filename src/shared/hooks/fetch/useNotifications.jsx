import { useFirestoreInfiniteQuery } from "@react-query-firebase/firestore";
import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "src/lib/firebase";
import { useUserStore } from "src/store/userStore";

const useNotifications = () => {
  const { currentUserId } = useUserStore();
  const notifications = collection(
    db,
    `notifications/${currentUserId}/notifications`
  );
  const notiQuery = query(
    notifications,
    orderBy("createdAt", "desc"),
    limit(5)
  );
  const notis = useFirestoreInfiniteQuery(
    "notifications",
    notiQuery,
    (snapshot) => {
      if (snapshot.docs.length === 0) {
        return;
      }
      const lastDocument = snapshot.docs[snapshot.docs.length - 1];

      return query(notiQuery, startAfter(lastDocument));
    }
  );

  return { notis };
};

export default useNotifications;
