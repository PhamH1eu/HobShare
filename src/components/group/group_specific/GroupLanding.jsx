import { useState } from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "src/store/userStore";

import ProfileHeader from "./profileHeader/ProfileHeader";
import NewPostInput from "src/components/home/NewsFeed/new_post/NewPostInput";
import Post from "src/components/home/NewsFeed/component/Post";
import Information from "./information/Information";
import Friends from "./friends/Friends";

import styled from "styled-components";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";
import CircularLoading from "src/shared/components/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  width: 100%;
  align-items: center;

  overflow-y: auto;
`;

const Main = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const Info = styled.div`
  position: sticky;
  bottom: 0;
`;

const MainContent = styled.div`
  width: 100%;
`;

const TabsHeader = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  & div {
    margin-left: 90px;
  }
`;

const posts = [];

const GroupLanding = () => {
  const { groupId } = useParams();
  const { currentUserId } = useUserStore();
  const isViewingOwnProfile = groupId === currentUserId;

  const { isLoading } = useUserInfo(groupId);

  const [value, setValue] = useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <Wrapper>
        <CircularLoading />
      </Wrapper>
    );
  }

  return (
    <TabContext value={value}>
      <Wrapper>
        <ProfileHeader />
        <TabsHeader>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Giới thiệu" value="1" sx={{ fontWeight: "600" }} />
            <Tab label="Diễn đàn" value="2" sx={{ fontWeight: "600" }} />
            <Tab label="Thành viên" value="3" sx={{ fontWeight: "600" }} />
          </TabList>
        </TabsHeader>
        <TabPanel value="1" sx={{ display: "flex", width: "70%" }}>
          <Main>
            <Information />
          </Main>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <Main>
            <MainContent>
              {isViewingOwnProfile && <NewPostInput />}
              <div>
                {posts.map((post, index) => (
                  <Post key={index} post={post} initComt={undefined} />
                ))}
              </div>
            </MainContent>
            <Info>
              <Information />
            </Info>
          </Main>
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <Friends />
        </TabPanel>
      </Wrapper>
    </TabContext>
  );
};

export default GroupLanding;
