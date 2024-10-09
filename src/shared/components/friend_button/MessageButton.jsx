import styled from "styled-components";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import useChatList from "src/shared/hooks/listen/useChatList";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import AddUserToChat from "src/services/chat/AddUserToChat";
import { useUserStore } from "src/store/userStore";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { Skeleton } from "@mui/material";

const Message = styled.button`
  background-color: #6ec924;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const MessageButton = ({ userId }) => {
  const { chats } = useChatList();
  const addChat = useChatDialogStore((state) => state.addChat);

  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const { data: user, isLoading } = useUserInfo(userId);
  const didInboxed = chats.find((chat) => chat?.receiverId === user?.id);

  const handleAddUser = async () => {
    if (didInboxed === undefined) {
      const newChat = await AddUserToChat(user, currentUser);
      addChat({
        ...newChat,
        user,
      });
    } else {
      addChat(didInboxed);
    }
  };

  if (isLoading)
    return <Skeleton variant="rounded" width="80px" height="35px" />;

  return (
    <Message onClick={handleAddUser}>
      <MarkEmailUnreadIcon
        // @ts-ignore
        color="white"
      />
      Nhắn tin
    </Message>
  );
};

export default MessageButton;
