import styled from "styled-components";
import { Avatar, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import useMembers from "src/shared/hooks/fetch/group/useMembers";
import CircularLoading from "src/shared/components/Loading";
import { GroupService, UserService } from "src/services/SubDatabaseService";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useUserStore } from "src/store/userStore";

const Container = styled.div`
  width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: Arial, sans-serif;
  margin-bottom: 32px;
  margin-top: 20px;
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

const KickButton = styled(LoadingButton)`
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
  text-transform: none;
  &:hover {
    background-color: #c4c4c4;
  }
`;

const Member = ({ member }) => {
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const { currentUserId } = useUserStore();
  const isAdmin = group.admins.some((admin) => admin.userId === currentUserId);

  const [loading, setLoading] = useState(false);

  const handleDelete = async (currentUserId) => {
    setLoading(true);
    await GroupService.removeSubCollection(
      `${groupId}/members/${currentUserId}`
    );
    await UserService.removeSubCollection(
      `${currentUserId}/joinedgroups/${groupId}`
    );
    queryClient.invalidateQueries("members");
    queryClient.invalidateQueries("membersCount");
    setLoading(false);
  };

  return (
    <FriendDetails>
      <Avatar src={member.avatar} />
      <FriendInfo>
        <FriendName>{member.username}</FriendName>
        <CommonFriends>12 bạn chung</CommonFriends>
      </FriendInfo>
      <AddFriend>
        <PersonAddIcon
          // @ts-ignore
          color="white"
        />
        Thêm bạn bè
      </AddFriend>
      {isAdmin && (
        <KickButton
          loading={loading}
          onClick={() => handleDelete(member.userId)}
        >
          Xoá
        </KickButton>
      )}
    </FriendDetails>
  );
};

function FriendsTabPanel({ users }) {
  return (
    <Box>
      {users.map((member, index) => (
        <FriendItem key={index}>
          <Member member={member}></Member>
        </FriendItem>
      ))}
    </Box>
  );
}

const Admins = ({ admins }) => {
  return (
    <Box>
      {admins.map((admin, index) => (
        <FriendItem key={index}>
          <FriendDetails>
            <Avatar src={admin.avatar} />
            <FriendInfo>
              <FriendName>{admin.username}</FriendName>
              <CommonFriends>12 bạn chung</CommonFriends>
            </FriendInfo>
          </FriendDetails>
        </FriendItem>
      ))}
    </Box>
  );
};

const Members = () => {
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const { members, isLoading } = useMembers(groupId);

  if (isLoading) {
    return <CircularLoading />;
  }

  return (
    <Container>
      <Header>
        <p>Thành viên</p>
        <span> · </span>
        <span>{members.length + 1}</span>
      </Header>
      <Role>Quản trị viên</Role>
      <Admins admins={group.admins}></Admins>
      {members.length > 0 && <Role>Thành viên</Role>}
      <FriendsTabPanel users={members}></FriendsTabPanel>
    </Container>
  );
};

export default Members;
