import { Routes, Route, useLocation } from "react-router-dom";
import Home from "src/components/home/Home";
import Messenger from "src/components/messenger/Messenger";
import Profile from "./components/profile/Profile";
import NavBar from "./shared/components/Navbar";
import FriendsTab from "./components/friendpost/FriendPost";
import SavedPage from "./components/saved/SavedPage";
import MemoriesPage from "./components/memories/Memories";
import ChatHolder from "./shared/components/chat_dialog/ChatHolder";
import MinimizedChatDialog from "./shared/components/chat_dialog/MinimizedChatDialog";
import SearchScreen from "./components/search/SearchScreen";
import PostPage from "./components/home/NewsFeed/PostPage";
import Activities from "./components/activities/Activities";

const Router = () => {
  let location = useLocation();
  let checkMess = Boolean(location.pathname === "/messenger");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/friends" element={<FriendsTab />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/search/:id" element={<SearchScreen />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
      {!checkMess && <ChatHolder />}
      {!checkMess && <MinimizedChatDialog />}
    </>
  );
};

export default Router;
