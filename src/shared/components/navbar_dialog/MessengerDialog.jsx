import styled from "styled-components";
import { Box, Typography, List } from "@mui/material";

import StyledLink from "../StyledLink";
import useChatList from "src/shared/hooks/listen/useChatList";
import { useUserStore } from "src/store/userStore";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { ChatService } from "src/services/DatabaseService";

import MessItem from "./MessItem";

const Container = styled(Box)`
  width: 360px;
  background-color: white;
`;

const NotificationHeader = styled(Typography)`
  font-size: 23px;
  font-weight: bold;
  margin: 0px 20px;
`;

const ChatListFooter = styled(Typography)`
  text-align: center;
  color: #6ec924;
  cursor: pointer;
  margin-top: 10px;
  position: sticky;
  bottom: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MessengerDialog = ({ handleClose }) => {
  const { chats } = useChatList();
  const { currentUser } = useUserStore();
  const addChat = useChatDialogStore((state) => state.addChat);

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
    addChat(chat);
    handleClose();
  };

  return (
    <Container>
      <NotificationHeader>Đoạn chat</NotificationHeader>
      <List
        sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "600px" }}
      >
        {chats.map((chat, index) => (
          <MessItem key={index} chat={chat} handleSelect={handleSelect} />
        ))}
      </List>
      <StyledLink to="/messenger">
        <ChatListFooter variant="body2" onClick={handleClose}>
          Xem tất cả trong Messenger
        </ChatListFooter>
      </StyledLink>
    </Container>
  );
};

export default MessengerDialog;
