import { useState } from "react";
import useChatList from "src/shared/hooks/listen/useChatList";
import { useUserStore } from "src/store/userStore";
import { useChatStore } from "src/store/chatStore";
import { ChatService } from "src/services/SubDatabaseService";

import Avatar from "src/shared/components/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import "./chatList.css";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";

export const ChatList = () => {
  const { chats } = useChatList();
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const changeChat = useChatStore((state) => state.changeChat);
  const chatId = useChatStore((state) => state.chatId);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = async (chat) => {
    //update with seen status
    const path = `${currentUserId}/chat/${chat.chatId}`;
    await ChatService.updateDocument(path, {
      isSeen: true,
    });
    //pop up chat in screen
    if (chatId === chat.chatId) return;
    changeChat(chat.chatId, chat.user, currentUser);
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <SearchIcon
            // @ts-ignore
            color="greyIcon"
          />
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè..."
            onChange={handleSearch}
          />
        </div>
      </div>
      {filteredChats.map((chat) => {
        return (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor:
                chat?.chatId === chatId
                  ? "rgba(235,245,255,255)"
                  : "transparent",
            }}
          >
            <Avatar src={chat.user.avatar} receiverId={chat.receiverId} />
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
                      backgroundColor: "#6ec924",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      marginLeft: "auto",
                    }
              }
            ></div>
          </div>
        );
      })}
    </div>
  );
};
