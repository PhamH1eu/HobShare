import { useState, useEffect } from "react";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { useUserStore } from "src/store/userStore";
import { UserService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const useChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        setLoading(true);
        //chats of current user
        const items = res.data().chats;
        //get user info of each chat, assign last message info to
        const promises = items.map(async (item) => {
          const userDoc = await UserService.get(item.receiverId);
          const user = userDoc.data();

          return {
            ...item,
            user,
          };
        });
        //query all user info
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        setLoading(false);
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser]);

  return { chats, loading };
};

async function getData(currentUser) {
  const q = doc(db, "userchats", currentUser.id);
  const querySnapshot = await getDoc(q);
  const items = querySnapshot.data().chats;
  //get user info of each chat, assign last message info to
  const promises = items.map(async (item) => {
    const userDoc = await UserService.get(item.receiverId);
    const user = userDoc.data();

    return {
      ...item,
      user,
    };
  });
  //query all user info
  const chatData = await Promise.all(promises);
  return chatData.sort((a, b) => b.updatedAt - a.updatedAt);
}

export const useQueryChatlist = (currentUser) => {
  const { isLoading, data } = useQuery('chatlist', () => getData(currentUser));

  return { isLoading, data };
};

export default useChatList;
