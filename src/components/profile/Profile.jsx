import { useState } from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "src/store/userStore";

import ProfileHeader from "./profileHeader/ProfileHeader";
import NewPostInput from "../home/NewsFeed/new_post/NewPostInput";
import Post from "../home/NewsFeed/component/Post";
import Information from "./information/Information";
import Hobbies from "./hobby/Hobbies";
import Friends from "./friends/Friends";
import Privacy from "./privacy/Privacy";
import HobbyPage from "./hobby/HobbyPage";

import styled from "styled-components";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
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
    margin-left: 120px;
  }
`;

const NoPosts = styled.div`
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
  font-weight: 600;
`;

const posts = [];

const Profile = () => {
  const { userId } = useParams();
  const { currentUserId } = useUserStore();
  const isViewingOwnProfile = userId === currentUserId;

  const { isLoading } = useUserInfo(userId);

  const [value, setValue] = useState("1");

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
            <Tab label="Bài viết" value="1" sx={{ fontWeight: "600" }} />
            <Tab label="Bạn bè" value="2" sx={{ fontWeight: "600" }} />
            <Tab label="Sở thích" value="3" sx={{ fontWeight: "600" }} />
            {isViewingOwnProfile && (
              <Tab label="Vị trí" value="4" sx={{ fontWeight: "600" }} />
            )}
          </TabList>
        </TabsHeader>
        <TabPanel value="1" sx={{ display: "flex", width: "70%" }}>
          <Main>
            <Info>
              <Information />
              <Hobbies />
            </Info>
            <MainContent>
              {isViewingOwnProfile && (
                <NewPostInput
                  groupId={undefined}
                  groupName={undefined}
                  groupWallpaper={undefined}
                />
              )}
              {posts.length > 0 ? (
                <div>
                  {posts.map((post, index) => (
                    <Post key={index} post={post} initComt={undefined} />
                  ))}
                </div>
              ) : (
                <NoPosts>Chưa có bài viết nào</NoPosts>
              )}
            </MainContent>
          </Main>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <Friends />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <HobbyPage />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 0 }}>
          <Privacy />
        </TabPanel>
      </Wrapper>
    </TabContext>
  );
};

export default Profile;
