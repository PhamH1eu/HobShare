import Router from "./Router";
import { Landing } from "src/components/auth/Landing";
import HobbyChoosingPage from "./components/hobby&privacy/Hobby";

import { useUserStore } from "src/store/userStore";
import { useListenAuth } from "src/shared/hooks/listen/useListenAuth";
import Notification from "src/shared/components/Notification";
import CircularLoading from "src/shared/components/Loading";

import useStatus from "./lib/status";

import useUserInfo from "./shared/hooks/fetch/useUserInfo";

const App = () => {
  useStatus();
  const { currentUserId, isSignedUp } = useUserStore();

  const { data: currentUser, isLoading } = useUserInfo(currentUserId);

  useListenAuth();

  if (isLoading) return <CircularLoading />;

  return (
    <div className="container">
      {currentUser ? (
        isSignedUp ? (
          <HobbyChoosingPage />
        ) : (
          <Router />
        )
      ) : (
        <Landing />
      )}
      <Notification />
    </div>
  );
};

export default App;
