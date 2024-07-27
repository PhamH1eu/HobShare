import { Chat } from "./chat/Chat";
import { Detail } from "./detail/Detail";
import { List } from "./list/List";
import { useChatStore } from "src/store/chatStore";

const Messenger = () => {
  const chatId = useChatStore((state) => state.chatId);

  return (
    <>
      <List />
      {chatId && <Chat />}
      {chatId && <Detail />}
    </>
  );
};

export default Messenger;
