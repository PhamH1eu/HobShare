import Router from "./Router";
import { Landing } from "src/components/auth/Landing";

import { useUserStore } from "src/store/userStore";
import { useListenAuth } from "src/hooks/useListenAuth";
import Notification from "src/shared/components/Notification";
import CircularLoading from "src/shared/components/Loading";

const App = () => {
  const { currentUser, isLoading } = useUserStore();

  useListenAuth();

  if (isLoading) return <CircularLoading />;

  return (
    <div className="container">
      {currentUser ? <Router /> : <Landing />}
      <Notification />
    </div>
  );
};

export default App;
