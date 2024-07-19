import { useEffect } from "react";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "src/lib/firebase";

export const useListenChat = (chatId, setChat) => {
  useEffect(() => {
    const q = query(collection(db, `chats/${chatId}/messages`), orderBy("sendAt", "asc"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.docs.forEach((doc) => chats.push(doc.data()));
      setChat(chats);
    });

    return () => {
      unSub();
    };
  }, [chatId, setChat]);
};
