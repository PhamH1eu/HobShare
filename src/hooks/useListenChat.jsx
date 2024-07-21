import { useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

//listen to chat
export const useListenChat = (chatId, setMessage, setLastMessageTimestamp) => {
  //register a listener and detach it when component unmounts
  useEffect(() => {
    //initial 5 docs
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("sendAt", "desc"),
      limit(20)
    );
    const unSub = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      setLastMessageTimestamp(
        querySnapshot.docs[querySnapshot.docs.length - 1].data().sendAt
      );
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

export const loadMoreMessages = async (
  chatId,
  lastMessageTimestamp,
  setLastMessageTimestamp,
  messages,
  setMessages,
  setHasMore,
  setLoading
) => {
  setLoading(true);
  await new Promise(resolve => setTimeout(resolve, 3000));
  // Load 20 more messages
  const q = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy("sendAt", "desc"),
    startAfter(lastMessageTimestamp),
    limit(20)
  );
  onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs;
    if (docs.length > 0) {
      // Update the last message timestamp
      setLastMessageTimestamp(docs[docs.length - 1].data().sendAt);
      // Append the new messages to the existing messages
      setMessages([
        ...docs.reverse().map((doc) => ({ id: doc.id, ...doc.data() })),
        ...messages,
      ]);
      // There are more messages to load
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    console.log(docs.length);
  });
  setLoading(false);
};
