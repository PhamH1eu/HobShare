import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "src/components/home/Home";
import Messenger from "src/components/messenger/Messenger";
import Profile from "./components/profile/Profile";
import NavBar from "./shared/components/Navbar";
import FriendsTab from "./components/friendpost/FriendPost";
import SavedPage from "./components/saved/SavedPage";
import MemoriesPage from "./components/memories/Memories";
import ChatDialog from "./shared/components/chat_dialog/ChatDialog";
import MinimizedChatDialog from "./shared/components/chat_dialog/MinimizedChatDialog";

const Router = () => {
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
      </Routes>
      <ChatDialog />
      <MinimizedChatDialog />
    </>
  );
};

export default Router;
