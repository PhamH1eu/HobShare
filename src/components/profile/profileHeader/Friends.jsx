import React from "react";
import styled from "styled-components";
import { Avatar, Tab, Tabs, Box } from "@mui/material";

const Container = styled.div`
  width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: Arial, sans-serif;
  margin-bottom: 32px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 16px;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const FriendDetails = styled.div`
  display: flex;
  align-items: center;
`;

const FriendInfo = styled.div`
  margin-left: 16px;
`;

const FriendName = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const CommonFriends = styled.div`
  font-size: 14px;
  color: #606770;
`;

const friendsList = [
  {
    name: "Lê Bá Trường",
    mutualFriends: 33,
    avatar: "https://i.pravatar.cc/40?u=1",
  },
  {
    name: "Nguyễn Đăng Hải",
    mutualFriends: 69,
    avatar: "https://i.pravatar.cc/40?u=2",
  },
  {
    name: "Đỗ Sáng",
    mutualFriends: 39,
    avatar: "https://i.pravatar.cc/40?u=3",
  },
  {
    name: "Thu Nhân",
    mutualFriends: 51,
    avatar: "https://i.pravatar.cc/40?u=4",
  },
  {
    name: "Tuấn Anh-nichan",
    mutualFriends: 44,
    avatar: "https://i.pravatar.cc/40?u=5",
  },
  {
    name: "Nguyen Trung Hieu",
    mutualFriends: 19,
    avatar: "https://i.pravatar.cc/40?u=6",
  },
  {
    name: "Thu Hieu",
    mutualFriends: 5,
    avatar: "https://i.pravatar.cc/40?u=7",
  },
];

const recentFriendsList = [
  {
    name: "Lê Bá Trường",
    mutualFriends: 33,
    avatar: "https://i.pravatar.cc/40?u=1",
  },
  {
    name: "Nguyễn Đăng Hải",
    mutualFriends: 69,
    avatar: "https://i.pravatar.cc/40?u=2",
  },
  {
    name: "Đỗ Sáng",
    mutualFriends: 39,
    avatar: "https://i.pravatar.cc/40?u=3",
  },
  {
    name: "Thu Nhân",
    mutualFriends: 51,
    avatar: "https://i.pravatar.cc/40?u=4",
  },
];

function FriendsTabPanel({ friends }) {
  return (
    <Box>
      {friends.map((friend, index) => (
        <FriendItem key={index}>
          <FriendDetails>
            <Avatar src={friend.avatar} />
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <CommonFriends>{friend.mutualFriends} bạn chung</CommonFriends>
            </FriendInfo>
          </FriendDetails>
        </FriendItem>
      ))}
    </Box>
  );
}

const Friends = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Header>Bạn bè</Header>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Tất cả bạn bè" />
        <Tab label="Đã thêm gần đây" />
      </StyledTabs>

      {tabValue === 0 && <FriendsTabPanel friends={friendsList} />}
      {tabValue === 1 && <FriendsTabPanel friends={recentFriendsList} />}
    </Container>
  );
};

export default Friends;
