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

import useUserInfo from "./shared/hooks/fetch/user/useUserInfo";

import { generateToken, messaging } from "./lib/firebase";
import { onMessage } from "firebase/messaging";
import toast from "react-hot-toast";
import { NotifiComponent } from "./shared/components/noti/NotifiComponent";
import { updateUserToken } from "./services/UserToken";

const App = () => {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      toast((t) => (
        <NotifiComponent
          message={{
            id: payload.data.id,
            url: payload.data.url,
            content: payload.data.content,
            createdAt: payload.data.createdAt,
            sourceName: payload.data.sourceName,
            sourceImage: payload.data.sourceImage,
          }}
          t={t}
        />
      ));
    });
  }, []);

  useStatus();
  const { currentUserId, isSignedUp } = useUserStore();
  useEffect(() => {
    if (currentUserId) {
      updateUserToken(currentUserId);
    }
  }, [currentUserId]);

  const { data: currentUser, isLoading } = useUserInfo(currentUserId);
  useListenAuth();

  if (isLoading || currentUserId === null) return <CircularLoading />;

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
