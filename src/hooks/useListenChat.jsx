import { useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

export const useListenChat = async (chatId, setMessage) => {
  useEffect(() => {
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("sendAt", "desc"),
      limit("5")
    );
    const unSub = onSnapshot(q, async (querySnapshot) => {
      const chats = [];
      querySnapshot.docs.reverse().forEach((doc) => {
        chats.push(doc.data());
      });
      setMessage(chats);
    });

    return () => {
      unSub();
    };
  }, [chatId, setMessage]);
};

export default async function nextchat(doc, chatId, setMessage) {
  const nex = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy("sendAt", "desc"),
    startAfter(doc),
    limit("5")
  );
  
  const result = await getDocs(nex);
  const oldMessage = [];
  result.forEach((item) => oldMessage.push(item.data()));
  setMessage(oldMessage);
}
