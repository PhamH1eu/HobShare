import Router from "./Router";
import { Landing } from "src/components/auth/Landing";
import HobbyChoosingPage from "./components/hobby&privacy/Hobby";

import { useUserStore } from "src/store/userStore";
import { useListenAuth } from "src/hooks/useListenAuth";
import Notification from "src/shared/components/Notification";
import CircularLoading from "src/shared/components/Loading";

const App = () => {
  const { currentUser, isLoading, isSignedUp } = useUserStore();

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
