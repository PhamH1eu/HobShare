import { useState } from "react";
import AddUser from "./addUser/AddUser";
import useChatList from "src/hooks/useChatList";
import { useUserStore } from "src/store/userStore";
import { useChatStore } from "src/store/chatStore";
import { ChatService } from "src/services/DatabaseService";

import SearchIcon from "@mui/icons-material/Search";
import "./chatList.css";
import React from "react";

export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const { chats } = useChatList();
  const { currentUser } = useUserStore();
  const changeChat = useChatStore((state) => state.changeChat);
  const chatId = useChatStore((state) => state.chatId);

  const handleSelect = async (chat) => {
    //get {chat id, lastMessage, isSeen} from chat list
    const userChats = chats.map((item) => {
      // eslint-disable-next-line no-unused-vars
      const { user, ...rest } = item;
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
    if (chatId === chat.chatId) return;
    changeChat(chat.chatId, chat.user);
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <SearchIcon 
// @ts-ignore
          color="greyIcon" />
          <input type="text" placeholder="Tìm kiếm bạn bè..." />
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
            backgroundColor:
              chat?.chatId === chatId ? "rgba(235,245,255,255)" : "transparent",
          }}
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="avatar" />
          <div className="text">
            <span>{chat.user.username}</span>
            <p style={{ fontWeight: chat?.isSeen ? "normal" : "bold" }}>
              {chat.lastMessage}
            </p>
          </div>
          <div
            style={
              chat?.isSeen
                ? {}
                : {
                    backgroundColor: "rgba(5,81,233,255)",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    marginLeft: "auto",
                  }
            }
          ></div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};
