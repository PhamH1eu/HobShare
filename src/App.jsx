import { Chat } from "./components/chat/Chat";
import { Detail } from "./components/detail/Detail";
import { List } from "./components/list/List";
import { Landing } from "./components/auth/Landing";
import Notification from "./components/notification/Notification";

import { useUserStore } from "./store/userStore";
import { useListenAuth } from "./hooks/useListenAuth";
import { useChatStore } from "./store/chatStore";
import CircularLoading from "./shared/components/Loading";

const App = () => {
  const { currentUser, isLoading } = useUserStore();
  const chatId = useChatStore((state) => state.chatId);

  //listen to auth change
  useListenAuth();

  if (isLoading) return <CircularLoading/>;

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
