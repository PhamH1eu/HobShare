import { Chat } from "./components/chat/Chat";
import { Detail } from "./components/detail/Detail";
import { List } from "./components/list/List";
import { Landing } from "./components/auth/Landing";
import Notification from "./components/notification/Notification";

import { useUserStore } from "./store/userStore";
import { useListenAuth } from "./hooks/useListenAuth";
import { useChatStore } from "./store/chatStore";

const App = () => {
  const { currentUser, isLoading } = useUserStore();
  const chatId = useChatStore((state) => state.chatId);

  useListenAuth();

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Landing />
      )}
      <Notification />
    </div>
  );
};

export default App;
