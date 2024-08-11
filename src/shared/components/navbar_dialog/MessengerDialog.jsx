import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";

import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

import StyledLink from "../StyledLink";
import useChatList from "src/hooks/useChatList";
import { useUserStore } from "src/store/userStore";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { ChatService } from "src/services/DatabaseService";

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
`;

const StyledBadge = muiStyled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 35,
  },
}));

const StyledListItem = styled(ListItem)`
  padding: 10px 10px;
  margin: 0px 10px;
  border-radius: 12px;
  cursor: pointer;

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

  const convertDifferenceTime = (time) => {
    const difference = differenceInSeconds(new Date(), new Date(time));
    if (difference < 60) {
      return `${difference} giây`;
    } else if (difference < 3600) {
      return `${differenceInMinutes(new Date(), new Date(time))} phút`;
    } else if (difference < 86400) {
      return `${differenceInHours(new Date(), new Date(time))} giờ`;
    } else if (difference < 604800) {
      return `${differenceInDays(new Date(), new Date(time))} ngày`;
    } else if (difference < 2592000) {
      return `${differenceInWeeks(new Date(), new Date(time))} tuần`;
    } else if (difference < 31536000) {
      return `${differenceInMonths(new Date(), new Date(time))} tháng`;
    } else {
      return ``;
    }
  };

  return (
    <Container>
      <NotificationHeader>Đoạn chat</NotificationHeader>
      <List>
        {chats.map((chat, index) => (
          <React.Fragment key={index}>
            <StyledListItem
              alignItems="flex-start"
              onClick={() => handleSelect(chat)}
            >
              <ListItemAvatar>
                <StyledBadge variant="dot" color="success">
                  <Avatar src={chat.user.avatar} />
                </StyledBadge>
              </ListItemAvatar>
              <Typography>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      style={{
                        fontWeight: "bold",
                        fontSize: chat.isSeen ? "0.9rem" : "1rem",
                      }}
                    >
                      {chat.user.username}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        color={chat.isSeen ? "textSecondary" : "black"}
                        component="span"
                        noWrap={true}
                        sx={{
                          fontWeight: chat.isSeen ? "normal" : "600",
                        }}
                      >
                        {chat.lastMessage}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={chat.isSeen ? "textSecondary" : "black"}
                        component="span"
                        style={{
                          marginLeft: "5px",
                          fontWeight: chat.isSeen ? "normal" : "600",
                        }}
                      >
                        · {convertDifferenceTime(chat.updatedAt)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Typography>
              {!chat.isSeen && (
                <div
                  style={{
                    backgroundColor: "#6ec924",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    marginLeft: "auto",
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                  }}
                ></div>
              )}
            </StyledListItem>
            <Divider variant="middle" />
          </React.Fragment>
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
