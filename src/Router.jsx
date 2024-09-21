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
import GroupWithSidebar from "./components/group/Group";
import GroupCreationPage from "./components/group/create/CreateGroup";
import GroupLanding from "./components/group/group_specific/GroupLanding";
import Hashtag from "./components/hashtag/Hashtag";
import MapPage from "./components/map/Map";
import { InstantSearch } from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  "N8BH27ZJ45",
  "d2bcec7ecee3e783e7e7e45ee12d6474"
);

const Router = () => {
  let location = useLocation();
  let checkMess = Boolean(location.pathname === "/messenger");
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="post_index"
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/friends" element={<FriendsTab />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/group" element={<GroupWithSidebar />} />
        <Route path="/group/create" element={<GroupCreationPage />} />
        <Route path="/group/:groupId" element={<GroupLanding />} />
        <Route path="/hashtag/:hashtag" element={<Hashtag />} />
        <Route path="/nearby" element={<MapPage />} />
      </Routes>
      {!checkMess && <ChatHolder />}
      {!checkMess && <MinimizedChatDialog />}
    </InstantSearch>
  );
};

export default Router;
