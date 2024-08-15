import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import styled from "styled-components";

import useChatList from "src/hooks/useChatList";

import Contact from "./Contact";

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

const Friends = () => {
  const { chats } = useChatList();

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
