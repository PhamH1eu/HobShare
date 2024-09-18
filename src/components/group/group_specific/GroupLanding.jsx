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
import Requests from "./request/Requests";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import { useUserStore } from "src/store/userStore";
import useGroupStatus from "src/shared/hooks/fetch/group/useGroupStatus";
import useGroupPosts from "src/shared/hooks/fetch/group/useGroupPosts";

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

const GroupLanding = () => {
  const { currentUserId } = useUserStore();
  const { groupId } = useParams();
  const { isLoading, isAdmin, group } = useGroupInfo(groupId);
  const { status, isLoadingStatus } = useGroupStatus({
    groupId,
    currentUserId,
    isAdmin,
  });

  const { posts, isLoading: isPostLoading } = useGroupPosts(groupId);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading || isPostLoading || isLoadingStatus) {
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
            {status === "joined" && (
              <Tab label="Diễn đàn" value="2" sx={{ fontWeight: "600" }} />
            )}
            <Tab label="Thành viên" value="3" sx={{ fontWeight: "600" }} />
            {isAdmin && (
              <Tab label="Phê duyệt" value="4" sx={{ fontWeight: "600" }} />
            )}
          </TabList>
        </TabsHeader>
        <TabPanel value="1" sx={{ display: "flex", width: "70%", padding: 0 }}>
          <Main>
            <Information />
          </Main>
        </TabPanel>
        {status === "joined" && (
          <TabPanel value="2" sx={{ padding: 0, width: "70%" }}>
            <Main>
              <MainContent>
                <NewPostInput
                  groupId={groupId}
                  groupName={group.name}
                  groupWallpaper={group.wallpaper}
                />
                <div>
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <Post
                        key={index}
                        postId={post.id}
                        initComt={undefined}
                        isAdminGroup={isAdmin}
                      />
                    ))
                  ) : (
                    <NoPosts>Chưa có bài viết nào</NoPosts>
                  )}
                </div>
              </MainContent>
              <Info>
                <div style={{ width: "25vw", position: "sticky", top: "32px" }}>
                  <Description />
                </div>
              </Info>
            </Main>
          </TabPanel>
        )}
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
