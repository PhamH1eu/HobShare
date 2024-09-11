import { useState, useMemo } from "react";

import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import styled from "styled-components";
import CircularLoading from "src/shared/components/Loading";

import { useQueryChatlist } from "src/shared/hooks/listen/useChatList";
import { useUserStore } from "src/store/userStore";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  padding: "12px",
};

const SearchBar = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f0f2f5;
  padding: 6px;
  padding-left: 8px;
  border-radius: 20px;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #f0f2f5;
    margin-left: 5px;
  }
`;

const RecipientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 50vh;
  overflow-y: auto;
  gap: 10px;
`;

const RecipientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    flex: 1;
    font-weight: 600;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #f0f2f5;
    cursor: pointer;
  }

  input {
    width: 18px;
    height: 18px;
    accent-color: #6ec924;
    margin-right: 10px;
  }
`;

const SendButton = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: none;
  background-color: #6ec924;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
`;

const Invite = ({ handleClose }) => {
  const { currentUserId } = useUserStore();
  const { isLoading, data: chats } = useQueryChatlist(currentUserId);
  const [search, setSearchinput] = useState("");

  const handleSearch = (e) => {
    setSearchinput(e.target.value);
  };

  const searchChat = useMemo(
    () =>
      isLoading ? [] : chats.filter((x) => x.user.username.includes(search)),
    [chats, isLoading, search]
  );

  const [recipients, setRecipients] = useState([]);

  function checkExist(chatId) {
    var flag = false;
    recipients.forEach((value) => {
      if (value.chatId == chatId) {
        flag = true;
      }
    });
    return flag;
  }

  const handleClick = (item) => {
    if (checkExist(item.chatId)) {
      setRecipients(recipients.filter((x) => x.chatId !== item.chatId));
    } else {
      setRecipients([
        ...recipients,
        { chatId: item.chatId, userId: item.user.id },
      ]);
    }
  };

  if (isLoading)
    return (
      <Box sx={style}>
        <CircularLoading />
      </Box>
    );

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "1px",
          borderBottom: "1px solid #ced0d4",
          padding: "10px",
          paddingTop: "0",
        }}
      >
        <h3 style={{ fontSize: "1.5rem" }}>Gửi đến</h3>
      </Box>
      <SearchBar>
        <SearchIcon
          // @ts-ignore
          color="greyIcon"
        />
        <input
          type="text"
          placeholder="Tìm kiếm người và nhóm"
          onChange={(e) => handleSearch(e)}
        />
      </SearchBar>
      <RecipientList>
        {searchChat.map((item, index) => (
          <RecipientItem key={index} onClick={() => handleClick(item)}>
            <img src={item.user.avatar} alt="Profile Picture" />
            <span>{item.user.username}</span>
            <input type="checkbox" readOnly checked={checkExist(item.chatId)} />
          </RecipientItem>
        ))}
      </RecipientList>
      <SendButton onClick={handleClose}>
        <ForwardToInboxIcon
          // @ts-ignore
          color="white"
        />
        Mời
      </SendButton>
    </Box>
  );
};

export default Invite;
