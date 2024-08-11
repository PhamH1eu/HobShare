import React from "react";
import styled from "styled-components";

import { useChatDialogStore } from "src/store/chatDialogStore";

const Wrapper = styled.div`
  height: 500px;
  width: 100px;
  background-color: pink;
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
`;

const MinimizedChatDialog = () => {
  const { minimizedChats, maximizeChat, removeMinimizedChat } =
    useChatDialogStore();

  return (
    <Wrapper>
      {minimizedChats.map((chat) => (
        <div key={chat}>
          <div>{chat}</div>
          <button onClick={() => maximizeChat(chat)}>maximizeChat</button>
          <button onClick={() => removeMinimizedChat(chat)}>Erase</button>
        </div>
      ))}
    </Wrapper>
  );
};

export default MinimizedChatDialog;
