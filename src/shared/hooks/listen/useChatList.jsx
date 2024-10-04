import { useState, useEffect } from "react";
import { onSnapshot, collection, query, getDocs } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { useUserStore } from "src/store/userStore";
import { UserService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const useChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUserId } = useUserStore();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "userchats", currentUserId, "chat"));

    const unsub = onSnapshot(q, async (querySnapshot) => {
      var items = [];
      querySnapshot.docs.forEach((doc) => {
        items.push(doc.data());
      });
      //get user info of each chat, assign last message info to
      const promises = items.map(async (item) => {
        // const userDoc = await UserService.get(item.receiverId);
        // const user = userDoc.data();

        return {
          ...item,
          // user,
        };
      });
      //query all user info
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, [currentUserId]);

  return { chats, loading };
};

async function getData(currentUserId) {
  const q = collection(db, "userchats", currentUserId, "chat");
  const querySnapshot = await getDocs(q);
  var items = [];
  querySnapshot.docs.forEach((doc) => {
    items.push(doc.data());
  });
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

export const useQueryChatlist = (currentUserId) => {
  const { isLoading, data } = useQuery("chatlist", () =>
    getData(currentUserId)
  );

  return { isLoading, data };
};

export default useChatList;
