import Tabs from "./Sidebar/Tabs";
import Friends from "./Friends/Friends";
import NewsFeed from "./NewsFeed/NewsFeed";
import styled from "styled-components";

const HomePage = styled.div`
  display: flex;
  margin-top: 64px;
  overflow-y: auto;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

const Home = () => {
  return (
    <HomePage>
      <Tabs></Tabs>
      <NewsFeed />
      <Friends />
    </HomePage>
  );
};

export default Home;
