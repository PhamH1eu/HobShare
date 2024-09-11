import "./addUser.css";
import { useState } from "react";
import { useUserStore } from "src/store/userStore";
import SearchUser from "src/services/SearchUser";
import AddUserToChat from "src/services/AddUserToChat";
import useChatList from "src/shared/hooks/listen/useChatList";
import { ChatService } from "src/services/SubDatabaseService";
import { useChatStore } from "src/store/chatStore";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

const AddUser = ({ setAddMode }) => {
  const [targetUser, setTargetUser] = useState(null);
  const currentUserId = useUserStore((state) => state.currentUserId);
  const { data: currentUser } = useUserInfo(currentUserId);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    const user = await SearchUser(username);
    setTargetUser(user);
  };

  const { chats } = useChatList();
  const chatId = useChatStore((state) => state.chatId);
  const changeChat = useChatStore((state) => state.changeChat);

  const handleSelect = async (chat) => {
    //update with seen status
    const path =  `${currentUserId}/chat/${chat.chatId}`;
    await ChatService.updateSubCollection(path, "isSeen", true);
    //pop up chat in screen
    if (chatId === chat.chatId) {
      return;
    }
    changeChat(chat.chatId, chat.user, currentUser);
  };

  const handleAddUser = async () => {
    var didInboxed = chats.find((chat) => chat.user.id === targetUser.id);
    if (didInboxed === undefined) {
      await AddUserToChat(targetUser, currentUser);
    }
    if (didInboxed) {
      await handleSelect(didInboxed);
    }
    setAddMode(false);
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Tìm kiếm</button>
      </form>
      {targetUser && (
        <div className="user">
          <div className="detail">
            <img src={targetUser.avatar || "./avatar.png"} alt="" />
            <span>{targetUser.username}</span>
          </div>
          <button onClick={handleAddUser}>Nhắn tin</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
