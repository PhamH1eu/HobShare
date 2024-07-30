import NavBar from "./Navbar/Navbar";
import Tabs from "./Sidebar/Tabs";
import Friends from "./Friends/Friends";
import NewsFeed from "./NewsFeed/NewsFeed";
import styled from "styled-components";

const HomePage = styled.div`
  display: flex;
  margin-top: 64px;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

const HomeWrapper = styled.div`
  overflow-y: auto;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <NavBar />
      <HomePage>
        <Tabs></Tabs>
        <NewsFeed />
        <Friends />
      </HomePage>
    </HomeWrapper>
  );
};

export default Home;
