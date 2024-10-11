import styled from "styled-components";
import { Avatar, Box, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import useMembers from "src/shared/hooks/fetch/group/useMembers";
import CircularLoading from "src/shared/components/Loading";
import { GroupService, UserService } from "src/services/SubDatabaseService";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useQueryClient } from "react-query";
import AcceptButton from "src/shared/components/friend_button/AcceptButton";
import AddButton from "src/shared/components/friend_button/AddButton";
import CancelButton from "src/shared/components/friend_button/CancelButton";
import DenyButton from "src/shared/components/friend_button/DenyButton";
import MessageButton from "src/shared/components/friend_button/MessageButton";
import useReceivedRequest from "src/shared/hooks/fetch/friend/useReceivedRequest";
import useSentRequest from "src/shared/hooks/fetch/friend/useSentRequest";
import useUserFriend from "src/shared/hooks/fetch/friend/useUserFriend";
import StyledLink from "src/shared/components/StyledLink";
import { useUserStore } from "src/store/userStore";
import useCommonFriend from "src/shared/hooks/fetch/friend/useCommonFriend";

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

  img:hover {
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

const ActionWrapper = styled.div`
  margin-left: auto;
  border-radius: 8px;
  padding: 10px;
  width: 100px;
  height: 40px;

  span {
    width: 24px !important;
    height: 24px !important;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const Actions = ({ userId }) => {
  const { currentUserId } = useUserStore();
  const { friends, isLoading } = useUserFriend();
  const { sentRequests, isLoadingSent } = useSentRequest();
  const { receivedRequests, isLoadingReceived } = useReceivedRequest();

  if (currentUserId === userId) {
    return null;
  }

  if (isLoading || isLoadingSent || isLoadingReceived) {
    return (
      <ActionWrapper>
        <CircularLoading />
      </ActionWrapper>
    );
  }

  // @ts-ignore
  if (friends.some((friend) => friend.id === userId)) {
    return (
      <div style={{ marginLeft: "auto" }}>
        <MessageButton userId={userId} />
      </div>
    );
  }

  // @ts-ignore
  if (sentRequests.some((request) => request.id === userId)) {
    return (
      <div style={{ marginLeft: "auto" }}>
        <CancelButton receiverId={userId} />
      </div>
    );
  }

  // @ts-ignore
  if (receivedRequests.some((request) => request.id === userId)) {
    return (
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        <AcceptButton receiverId={userId} />
        <DenyButton senderId={userId} />
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "auto" }}>
      <AddButton receiverId={userId} />
    </div>
  );
};

const Member = ({ member }) => {
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const { isAdmin } = useGroupInfo(groupId);
  const { commonFriends, isLoading } = useCommonFriend(member.userId);
  const { currentUserId } = useUserStore();

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
      <StyledLink to={`/profile/${member.userId}`}>
        <Avatar src={member.avatar} />
      </StyledLink>
      <FriendInfo>
        <FriendName>{member.username}</FriendName>
        {isLoading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            width="60px"
            height="20px"
          />
        ) : currentUserId === member.userId ? null : (
          <CommonFriends>{commonFriends} bạn chung</CommonFriends>
        )}
      </FriendInfo>
      <Actions userId={member.userId} />
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
  const { commonFriends, isLoading } = useCommonFriend(admins.userId);
  const { currentUserId } = useUserStore();

  return (
    <Box>
      {admins.map((admin, index) => (
        <FriendDetails key={index}>
          <StyledLink to={`/profile/${admin.userId}`}>
            <Avatar src={admin.avatar} />
          </StyledLink>
          <FriendInfo>
            <FriendName>{admin.username}</FriendName>
            {isLoading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                width="60px"
                height="20px"
              />
            ) : currentUserId === admin.userId ? null : (
              <CommonFriends>{commonFriends} bạn chung</CommonFriends>
            )}
          </FriendInfo>
          <Actions userId={admin.userId} />
        </FriendDetails>
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
