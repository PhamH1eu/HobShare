import { Box, Typography, Button, Avatar } from "@mui/material";
import styled from "styled-components";

import useModal from "src/shared/hooks/util/useModal";
import AddRequestModal from "../profile/profileHeader/AddRequestModal";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled(Box)`
  width: 60%;
`;

const FriendContainer = styled(Box)`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FriendInfo = styled(Box)`
  display: flex;
  align-items: center;
`;

const FriendDetails = styled(Box)`
  margin-left: 16px;
`;

const friends = [
  {
    id: 1,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
  {
    id: 2,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
  {
    id: 3,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
  {
    id: 3,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
  {
    id: 3,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
  {
    id: 3,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
  {
    id: 3,
    name: "Thu Hieu",
    avatar: "/path-to-avatar.jpg",
    mutualFriends: 5,
    work: "Ban TVHT - SGUET",
    school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  },
];

const FriendsContent = () => {
  const { open, handleClose, handleOpen } = useModal();

  return (
    <Container>
      <Wrapper>
        {friends.map((friend, index) => (
          <FriendContainer key={index}>
            <FriendInfo>
              <Avatar src={friend.avatar} />
              <FriendDetails>
                <Typography variant="h6">{friend.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {friend.mutualFriends} mutual friends
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {friend.work}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {friend.school}
                </Typography>
              </FriendDetails>
            </FriendInfo>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add Friend
            </Button>
          </FriendContainer>
        ))}
      </Wrapper>
      <AddRequestModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default FriendsContent;
