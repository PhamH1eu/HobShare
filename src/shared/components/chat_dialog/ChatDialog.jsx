import styled from "styled-components";
import StyledLink from "../StyledLink";
import {
  Box,
  Avatar,
  IconButton,
  InputBase,
  styled as MuiStyled,
} from "@mui/material";
import { Image, EmojiEmotions, Send } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import CircularLoading from "../Loading";

import InfiniteScroll from "react-infinite-scroller";
import { useUserStore } from "src/store/userStore";
import { useChatStore } from "src/store/chatStore";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { useListenChat } from "src/hooks/useListenChat";
import { loadMoreMessages } from "src/hooks/useListenChat";
import { useState } from "react";

const Wrapper = styled.div`
  width: 320px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Header = MuiStyled(Box)`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;

  & a:hover {
    border-radius: 5px;
    background-color: #f0f0f0;
  }
`;

const MessageContainer = MuiStyled(Box)`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  height: 340px;
`;

const Message = MuiStyled(Box)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  ${(props) =>
    // @ts-ignore
    props.position === "right"
      ? "justify-content: flex-end;"
      : "justify-content: flex-start;"}
`;

const MessageText = MuiStyled(Box)`
  background-color: ${(props) =>
    // @ts-ignore
    props.position === "right" ? "#99EA56" : "#f0f0f0"};

  color: #000;
  padding: 6px 12px;
  font-size: 15px;
  border-radius: 18px;
  max-width: 60%;
  word-break: break-word;
`;

const InputContainer = MuiStyled(Box)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
`;

const CustomInput = MuiStyled(InputBase)`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 10px;
`;

const ChatDialog = ({ chat }) => {
  const { minimizeChat, removeOpenChat } = useChatDialogStore();

  const { currentUser } = useUserStore();
  const { chatId, user } = chat;
  const isCurrentUserBlocked = user.blocked.includes(currentUser.id);
  const isReceiverBlocked = currentUser.blocked.includes(user.id);

  const [messages, setMessages] = useState([]);
  const setMessage = (incomingMess) => {
    setMessages([...incomingMess]);
  };
  const setNewMessage = (incomingMess) => {
    setMessages([...messages, incomingMess]);
  };

  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useListenChat(
    chatId,
    setNewMessage,
    setMessage,
    setLastMessageTimestamp,
    setHasMore
  );

  function load() {
    if (loading) return;
    if (!lastMessageTimestamp) return;
    loadMoreMessages(
      chatId,
      lastMessageTimestamp,
      setLastMessageTimestamp,
      messages,
      setMessage,
      setHasMore,
      setLoading
    );
  }

  return (
    <Wrapper>
      <Header>
        <Avatar src={chat.user.avatar} />
        <StyledLink to="/profile/5">
          <Box sx={{ marginLeft: 1, cursor: "pointer", paddingRight: "5px" }}>
            <Box fontWeight="bold">{chat.user.username}</Box>
            <Box fontSize="small" color="gray">
              Hoạt động 31 phút trước
            </Box>
          </Box>
        </StyledLink>
        <Box sx={{ marginLeft: "auto", display: "flex" }}>
          <IconButton color="primary" onClick={() => minimizeChat(chat)}>
            <RemoveIcon color="primary" />
          </IconButton>
          <IconButton color="primary" onClick={() => removeOpenChat(chat)}>
            <ClearIcon color="primary" />
          </IconButton>
        </Box>
      </Header>
      <MessageContainer>
        <InfiniteScroll
          loadMore={() => load()}
          hasMore={hasMore}
          isReverse={true}
          loader={<CircularLoading key={0} />}
          useWindow={false}
        >


          {messages.map((message, index) => (
            <Message
              key={index}
              // @ts-ignore
              position={message.position}
            >
              {message.position === "left" && (
                <Avatar src={message.avatar} sx={{ marginRight: 1 }} />
              )}
              <MessageText
                // @ts-ignore
                position={message.position}
              >
                {message.text}
              </MessageText>
            </Message>
          ))}

          
        </InfiniteScroll>
      </MessageContainer>
      <InputContainer>
        <IconButton color="primary">
          <Image color="primary" />
        </IconButton>
        <IconButton color="primary">
          <EmojiEmotions color="primary" />
        </IconButton>
        <CustomInput placeholder="Aa" />
        <IconButton color="primary">
          <Send color="primary" />
        </IconButton>
      </InputContainer>
    </Wrapper>
  );
};

export default ChatDialog;
