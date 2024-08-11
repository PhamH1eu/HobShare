import React from "react";
import styled from "styled-components";

import { useChatDialogStore } from "src/store/chatDialogStore";

const Wrapper = styled.div`
  height: 460px;
  width: 330px;
  background-color: white;
  position: fixed;
  bottom: 0;
  right: 200px;
  z-index: 1000;
`;

const ChatDialog = () => {
  const { openChats, minimizeChat, removeOpenChat } = useChatDialogStore();

  return (
    <Wrapper>
      {openChats.map((chat) => (
        <div key={chat}>
          <div>{chat}</div>
          <button onClick={() => minimizeChat(chat)}>Minimize</button>
          <button onClick={() => removeOpenChat(chat)}>Close</button>
        </div>
      ))}
    </Wrapper>
  );
};

export default ChatDialog;
