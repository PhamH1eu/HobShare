import { useEffect } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "src/lib/firebase";

export const useListenChat = (chatId, setChat) => {
  useEffect(() => {
    const q = query(collection(db, `chats/${chatId}/messages`));
    const unSub = onSnapshot(q, (querySnapshot) => {
      console.log("object :>> ", querySnapshot.docs[0].data());
      // console.log("object :>> ", res.docs[0]['_document'].data.value.mapValue.fields);
      // setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId, setChat]);
};
