import styled from "styled-components";
import { Avatar, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import useGroupInfo from "src/shared/hooks/fetch/useGroup";

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
  display: flex;
  gap: 5px;

  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  span {
    margin-top: 4px;
    color: #8c8c8c;
  }
`;

const Role = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin: 8px 0;
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
  width: 100%;
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

const AddFriend = styled.button`
  margin-left: auto;
  background-color: #6ec924;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const KickButton = styled.button`
  background-color: #e0dcdc;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 8px;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

function FriendsTabPanel({users}) {
  return (
    <Box>
      {users.map((friend, index) => (
        <FriendItem key={index}>
          <FriendDetails>
            <Avatar src={friend.avatar} />
            <FriendInfo>
              <FriendName>{friend.username}</FriendName>
              <CommonFriends>12 bạn chung</CommonFriends>
            </FriendInfo>
            <AddFriend>
              <PersonAddIcon
                // @ts-ignore
                color="white"
              />
              Thêm bạn bè
            </AddFriend>
            <KickButton>Xoá</KickButton>
          </FriendDetails>
        </FriendItem>
      ))}
    </Box>
  );
}

const Members = () => {
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  
  return (
    <Container>
      <Header>
        <p>Thành viên</p>
        <span> · </span>
        <span>99287</span>
      </Header>
      <Role>Quản trị viên</Role>
      <FriendsTabPanel users={group.admins}></FriendsTabPanel>
      <Role>Thành viên</Role>
      <FriendsTabPanel users={group.admins}></FriendsTabPanel>
    </Container>
  );
};

export default Members;
