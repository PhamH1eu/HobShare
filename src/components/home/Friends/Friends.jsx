import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import styled from "styled-components";

import useChatList from "src/shared/hooks/listen/useChatList";

import Contact from "./Contact";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

const groupChats = [];

const ContactList = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 64px);
  width: 300px;
  margin-top: 5px;
  padding-right: 10px;
  padding-left: 10px;
  overflow-y: auto;
  background-color: white;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }

  &:hover {
    &::-webkit-scrollbar {
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  }

  h2 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(101, 103, 107, 255);
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 10px;

  input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }

  h2 {
    color: rgba(101, 103, 107, 255);
  }

  button {
    background-color: transparent;
    margin-left: auto;
    margin-top: 10px;
    border-radius: 50%;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
`;

const ContactName = styled.span`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
`;

const AvatarWrapper = styled(Box)(() => ({
  position: "relative",
  cursor: "pointer",
  "&:hover .close-button": {
    display: "flex",
  },
}));

const array = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4];

const Friends = () => {
  const minimizedChats = useChatDialogStore((state) => state.minimizedChats);
  const addChat = useChatDialogStore((state) => state.addChat);

  const { chats, loading } = useChatList();
  useEffect(() => {
    if (
      chats[0] &&
      !chats[0].isSeen &&
      !minimizedChats.some((item) => item.chatId === chats[0].chatId)
    ) {
      addChat(chats[0]);
    }
  }, [chats]);

  if (loading) {
    return (
      <ContactList>
        <SearchBar>
          <h2>Người liên hệ</h2>
          <IconButton style={{ width: "40px", height: "40px" }}>
            <SearchIcon
              // @ts-ignore
              color="greyIcon"
            />
          </IconButton>
        </SearchBar>
        {array.map((_, index) => (
          <ContactItem key={index}>
            <AvatarWrapper>
              <Skeleton
                animation="wave"
                variant="circular"
                width="40px"
                height="40px"
              ></Skeleton>
            </AvatarWrapper>
            <ContactName>
              <Skeleton
                animation="wave"
                variant="rounded"
                width="180px"
                height="40px"
              ></Skeleton>
            </ContactName>
          </ContactItem>
        ))}
      </ContactList>
    );
  }

  return (
    <ContactList>
      <SearchBar>
        <h2>Người liên hệ</h2>
        <IconButton style={{ width: "40px", height: "40px" }}>
          <SearchIcon
            // @ts-ignore
            color="greyIcon"
          />
        </IconButton>
      </SearchBar>
      {chats.map((contact, index) => (
        <Contact key={index} contact={contact}></Contact>
      ))}
      {groupChats.length > 0 && <h2>Cuộc trò chuyện nhóm</h2>}
      {groupChats.map((chat, index) => (
        <Contact key={index} contact={chat}></Contact>
      ))}
    </ContactList>
  );
};

export default Friends;
