import { useEffect} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "src/lib/firebase";

export const useListenChat = (chatId, setChat) => {
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId, setChat]);
};
