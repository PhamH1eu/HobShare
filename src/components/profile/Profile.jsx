import { useState } from "react";
import { useParams } from "react-router-dom";

import { useUserStore } from "src/store/userStore";

import ProfileHeader from "./profileHeader/ProfileHeader";
import NewPostInput from "../home/NewsFeed/NewPostInput";
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
import React from "react";

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
  width: 70%;
  gap: 30px;
`;

const Info = styled.div`
  position: sticky;
  bottom: 0;
`;

const MainContent = styled.div``;

const TabsHeader = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  & div {
    margin-left: 120px;
  }
`;

const posts = [
  {
    authorAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    authorName: "Planet Rus",
    time: "14 giờ",
    postContent:
      "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
    postVideo:
      "https://firebasestorage.googleapis.com/v0/b/reactchat-3358f.appspot.com/o/images%2Fy2mate.com%20-%20GREEN%20GREEN%20WHATS%20YOUR%20PROBLEM_360p.mp4?alt=media&token=e1dbe288-1b84-40af-ac21-9fd78af70d69",
    reactions: 864,
  },
  {
    authorAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    authorName: "Planet Rus",
    time: "14 giờ",
    postContent:
      "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
    postImage:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1ocvNi.img?w=768&h=576&m=6",
    reaction: 627,
  },
  {
    authorAvatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    authorName: "Planet Rus",
    time: "14 giờ",
    postContent:
      "Nghịch lý Uzbekistan: Xăng A95 25.000 vnđ/lít, A92 20500 đ/lít, diesel 22.000đ/lít. Giá taxi (yandex go): 6-7000 đ/km Buýt intercity 50 km: 12.000 đ Tàu điện ngầm: 3400 đ (vé thẻ) hay 4000 đ (vé giấy)...",
    postVideo:
      "https://firebasestorage.googleapis.com/v0/b/reactchat-3358f.appspot.com/o/images%2Fy2mate.com%20-%20GREEN%20GREEN%20WHATS%20YOUR%20PROBLEM_360p.mp4?alt=media&token=e1dbe288-1b84-40af-ac21-9fd78af70d69",
    reactions: 864,
  },
];

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useUserStore();
  const isViewingOwnProfile = userId === currentUser.id;

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Wrapper>
        <ProfileHeader />
        <TabsHeader>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Bài viết" value="1" sx={{ fontWeight: "600" }} />
            <Tab label="Bạn bè" value="2" sx={{ fontWeight: "600" }} />
            <Tab label="Sở thích" value="3" sx={{ fontWeight: "600" }} />
            {isViewingOwnProfile && <Tab label="Vị trí" value="4" sx={{ fontWeight: "600" }} />}
          </TabList>
        </TabsHeader>
        <TabPanel value="1" sx={{ display: "flex", placeContent: "center" }}>
          <Main>
            <Info>
              <Information />
              <Hobbies />
            </Info>
            <MainContent>
              {isViewingOwnProfile && <NewPostInput />} 
              <div>
                {posts.map((post, index) => (
                  <Post key={index} post={post} />
                ))}
              </div>
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
