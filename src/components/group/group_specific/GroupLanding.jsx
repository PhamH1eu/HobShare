import { useState } from "react";
import { useParams } from "react-router-dom";

import ProfileHeader from "./profileHeader/ProfileHeader";
import NewPostInput from "src/components/home/NewsFeed/new_post/NewPostInput";
import Post from "src/components/home/NewsFeed/component/Post";
import Description from "./information/Description";
import Information from "./information/Information";
import Members from "./members/Members";

import styled from "styled-components";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularLoading from "src/shared/components/Loading";
import usePosts from "src/shared/hooks/fetch/post/usePosts";
import Requests from "./request/Requests";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroup";

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
  margin-left: 32px;
`;

const TabsHeader = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  & div {
    margin-left: 90px;
  }
`;

const GroupLanding = () => {
  const { groupId } = useParams();
  const { isLoading } = useGroupInfo(groupId);

  const { posts, isLoading: isPostLoading } = usePosts();

  const [value, setValue] = useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading || isPostLoading) {
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
          <TabList onChange={handleChange}>
            <Tab label="Giới thiệu" value="1" sx={{ fontWeight: "600" }} />
            <Tab label="Diễn đàn" value="2" sx={{ fontWeight: "600" }} />
            <Tab label="Thành viên" value="3" sx={{ fontWeight: "600" }} />
            <Tab label="Phê duyệt" value="4" sx={{ fontWeight: "600" }} />
          </TabList>
        </TabsHeader>
        <TabPanel value="1" sx={{ display: "flex", width: "70%" }}>
          <Main>
            <Information />
          </Main>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, width: "70%" }}>
          <Main>
            <MainContent>
              <NewPostInput groupId={groupId} groupName={undefined} />
              <div>
                {posts.map((post, index) => (
                  <Post key={index} post={post} initComt={undefined} />
                ))}
              </div>
            </MainContent>
            <Info>
              <div style={{ width: "25vw", position: "sticky", top: "32px" }}>
                <Description />
              </div>
            </Info>
          </Main>
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <Members />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 0 }}>
          <Requests />
        </TabPanel>
      </Wrapper>
    </TabContext>
  );
};

export default GroupLanding;
