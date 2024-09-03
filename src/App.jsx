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
import toast from "react-hot-toast";
import { NotifiComponent } from "./shared/components/noti/NotifiComponent";

const App = () => {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast((t) => (
        <NotifiComponent
          message={{
            url: "/post/2",
            content: "This is a notificatio21312123121321321233213213213n",
            createdAt: 0,
            sourceName: "Source Name",
            sourceImage: "https://via.placeholder.com/150",
          }}
          t={t}
        />
      ));
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
