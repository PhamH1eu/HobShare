import Sidebar from "src/components/home/Sidebar/Sidebar";
import Friends from "src/components/home/Friends/Friends";

import OnlyFriendPosts from "./OnlyFriendPosts";
import FriendRequestList from "./FriendRequestsList";

import styled from "styled-components";

const HomePage = styled.div`
  display: flex;
  width: 100%;
  margin-top: 64px;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

const Main = styled.div`
  flex: 2;
  .posts {
    display: flex;
    flex-direction: column;
  }
`;

const FriendsTab = () => {
  return (
    <HomePage>
      <Sidebar />
      <Main>
        <FriendRequestList />
        <OnlyFriendPosts />
      </Main>
      <Friends />
    </HomePage>
  );
};

export default FriendsTab;
