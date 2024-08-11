import React from "react";
import styled from "styled-components";
import ChatDialog from "./ChatDialog";
import { useChatDialogStore } from "src/store/chatDialogStore";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 130px;
  z-index: 1000;
  display: flex;

  gap: 20px;
`;

const ChatHolder = () => {
  const { openChats } = useChatDialogStore();
  return (
    <Wrapper>
      {openChats.map((chat, index) => (
        <ChatDialog key={index} index={chat} />
      ))}
    </Wrapper>
  );
};

export default ChatHolder;
