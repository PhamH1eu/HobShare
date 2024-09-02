import { useEffect } from "react";
import Router from "./Router";
import { Landing } from "src/components/auth/Landing";
import HobbyChoosingPage from "./components/hobby&privacy/Hobby";

import { useUserStore } from "src/store/userStore";
import { useListenAuth } from "src/shared/hooks/listen/useListenAuth";
import Notification from "src/shared/components/noti/Notification";
import AppNoti from "./shared/components/noti/AppNoti";
import CircularLoading from "src/shared/components/Loading";

import useStatus from "./lib/status";

import useUserInfo from "./shared/hooks/fetch/useUserInfo";

import { generateToken, messaging } from "./lib/firebase";
import { onMessage } from "firebase/messaging";

const App = () => {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, []);

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
      <AppNoti />
    </div>
  );
};

export default App;
