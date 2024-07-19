import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../store/userStore";
import { useChatStore } from "../../../store/chatStore";
import { db } from "../../../lib/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ChatService, UserService } from "src/services/DatabaseService";
import "./chatList.css";

export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const changeChat = useChatStore((state) => state.changeChat);

  //TODO: listen to message changes [NEED TO UNDERSTAND]
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
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
      }
    );

    return () => unsub();
  }, [currentUser]);

  const handleSelect = async (chat) => {
    //get {chat id, lastMessage, isSeen} from chat list
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      //TODO: try this
      // delete item.user;
      return rest;
    });

    //get index of selected chat in list
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    //seen message
    userChats[chatIndex].isSeen = true;

    //update with seen status
    ChatService.update(currentUser.id, {
      chats: userChats,
    });
    //pop up chat in screen
    changeChat(chat.chatId, chat.user);
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="search" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          className="add"
          onClick={() => setAddMode(!addMode)}
        />
      </div>
      {chats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="avatar" />
          <div className="text">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};
