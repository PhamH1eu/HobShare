import React from "react";
import styled from "styled-components";
import { Avatar, Tab, Tabs, Box, Skeleton } from "@mui/material";
import CircularLoading from "src/shared/components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import useSpecificUserFriend from "src/shared/hooks/fetch/friend/useSpecificUserFriend";
import useCommonFriend from "src/shared/hooks/fetch/friend/useCommonFriend";
import { useUserStore } from "src/store/userStore";

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

  img {
    cursor: pointer;
    filter: brightness(0.8);
  }
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

const CommonFriend = ({ userId }) => {
  const { commonsFriend, isLoading } = useCommonFriend(userId);
  const { currentUserId } = useUserStore();

  return isLoading ? (
    <Skeleton variant="rounded" animation="wave" width="60px" height="20px" />
  ) : currentUserId === userId ? null : (
    <CommonFriends>{commonsFriend} bạn chung</CommonFriends>
  );
};

function FriendsTabPanel({ friends }) {
  const navigate = useNavigate();
  return (
    <Box>
      {friends.map((friend, index) => (
        <FriendItem key={index}>
          <FriendDetails>
            <Avatar
              src={friend.avatar}
              onClick={() => navigate(`/profile/${friend.id}`)}
            />
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <CommonFriend userId={friend.id} />
            </FriendInfo>
          </FriendDetails>
        </FriendItem>
      ))}
    </Box>
  );
}

const filterAndSortRecentFriends = (friends) => {
  const now = new Date();

  // Filter elements that have a friendshipSince within the last 2 days
  const recentFriends = friends.filter((friend) => {
    const friendshipDate = new Date(friend.friendshipSince);
    // @ts-ignore
    const diffInDays = (now - friendshipDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return diffInDays <= 2; // Only keep friends added in the last 2 days
  });

  // Sort the friends by friendshipSince, from latest to earliest
  recentFriends.sort(
    // @ts-ignore
    (a, b) => new Date(b.friendshipSince) - new Date(a.friendshipSince)
  );

  return recentFriends;
};

const Friends = () => {
  const { userId } = useParams();
  const [tabValue, setTabValue] = React.useState(0);
  const { friends, isLoading } = useSpecificUserFriend(userId);

  if (isLoading) {
    return (
      <Container>
        <Header>Bạn bè</Header>
        <CircularLoading />
      </Container>
    );
  }

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

      {tabValue === 0 && <FriendsTabPanel friends={friends} />}
      {tabValue === 1 && (
        <FriendsTabPanel friends={filterAndSortRecentFriends(friends)} />
      )}
    </Container>
  );
};

export default Friends;
