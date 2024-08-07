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
export const useListenChat = (
  chatId,
  setNewMessage,
  setMessage,
  setLastMessageTimestamp,
  setHasMore
) => {
  //register a listener and detach it when component unmounts
  useEffect(() => {
    //initial 5 docs
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("sendAt", "desc"),
      limit(20)
    );
    const unSub = onSnapshot(q, (querySnapshot) => {
      let flag = false;
      if (querySnapshot.docs.length === 0) {
        setHasMore(false);
        return;
      }

      //check new message -- co the nham lan voi lan dau initial fetch
      // Lần đàu vẫn là add
      querySnapshot.docChanges().forEach((change) => {
        //handle sendAt null and type == added
        if (change.doc.data().sendAt === null) {
          flag = true;
        }
        if (change.type === "modified") {
          flag = true;
          setNewMessage(change.doc.data());
        }
      });
      if (flag) return;
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
  }, [chatId, setMessage, setNewMessage, setLastMessageTimestamp, setHasMore]);
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
  // Load 20 more messages
  const q = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy("sendAt", "desc"),
    startAfter(lastMessageTimestamp),
    limit(20)
  );
  await new Promise(resolve => setTimeout(resolve, 2000));
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
  });
  setLoading(false);
};
