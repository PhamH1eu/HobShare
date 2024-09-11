import styled from "styled-components";
import { Box, Typography, List } from "@mui/material";

import StyledLink from "../StyledLink";
import useChatList from "src/shared/hooks/listen/useChatList";
import { useUserStore } from "src/store/userStore";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { ChatService } from "src/services/SubDatabaseService";

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
  position: sticky;
  bottom: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MessengerDialog = ({ handleClose }) => {
  const { chats } = useChatList();
  const { currentUserId } = useUserStore();
  const addChat = useChatDialogStore((state) => state.addChat);

  const handleSelect = async (chat) => {
    //update with seen status
    const path =  `${currentUserId}/chat/${chat.chatId}`;
    await ChatService.updateSubCollection(path, "isSeen", true);
    addChat(chat);
    handleClose();
  };

  return (
    <Container>
      <NotificationHeader>Đoạn chat</NotificationHeader>
      <List
        sx={{ overflowY: "auto", overflowX: "hidden", maxHeight: "600px" }}
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
