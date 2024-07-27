import React from "react";

import Tabs from "./Tabs";
import Friends from "./Friends";
import NewsFeed from "./NewsFeed";
import styled from "styled-components";

const HomePage = styled.div`
  display: flex;
  overflow-y: auto;
  width: 100%;
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
