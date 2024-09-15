import styled from "styled-components";
import { Avatar, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import usePendingRequests from "src/shared/hooks/fetch/group/usePendingRequests";
import { useParams } from "react-router-dom";
import CircularLoading from "src/shared/components/Loading";
import { GroupService, UserService } from "src/services/SubDatabaseService";
import { useQueryClient } from "react-query";
import { useState } from "react";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";

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

const Accept = styled(LoadingButton)`
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
  text-transform: none;

  &:hover {
    background-color: #5cb41b;
  }
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
    background-color: #e0e0e0;
  }
`;

function RequestTabPanel({ pendingRequests }) {
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDeny, setLoadingDeny] = useState(false);

  const handleAccept = async (request) => {
    setLoadingAccept(true);
    await GroupService.removeSubCollection(
      `${groupId}/pendingRequests/${request.userId}`
    );
    await GroupService.createSubCollection(
      `${groupId}/members/${request.userId}`,
      request
    );
    await UserService.createSubCollection(
      `${request.userId}/joinedgroups/${groupId}`,
      {
        groupId: groupId,
        name: group.name,
        wallpaper: group.wallpaper,
      }
    );
    queryClient.invalidateQueries("pendingRequests");
    queryClient.invalidateQueries("members");
    queryClient.invalidateQueries("membersCount");
    setLoadingAccept(false);
  };

  const handleDeny = async (currentUserId) => {
    setLoadingDeny(true);
    await GroupService.removeSubCollection(
      `${groupId}/pendingRequests/${currentUserId}`
    );
    queryClient.invalidateQueries("pendingRequests");
    setLoadingDeny(false);
  };

  return (
    <Box>
      {pendingRequests.map((request, index) => (
        <FriendItem key={index}>
          <FriendDetails>
            <Avatar src={request.avatar} />
            <FriendInfo>
              <FriendName>{request.username}</FriendName>
              <CommonFriends>11 bạn chung</CommonFriends>
            </FriendInfo>
            <Accept
              loading={loadingAccept}
              onClick={() => handleAccept(request)}
            >
              <HowToRegIcon
                // @ts-ignore
                color="white"
              />
              Chấp nhận
            </Accept>
            <KickButton
              loading={loadingDeny}
              onClick={() => handleDeny(request.userId)}
            >
              Xoá
            </KickButton>
          </FriendDetails>
        </FriendItem>
      ))}
    </Box>
  );
}

const Requests = () => {
  const { groupId } = useParams();
  const { pendingRequests, count, isLoading } = usePendingRequests(groupId);

  if (isLoading)
    return (
      <Container>
        <CircularLoading />
      </Container>
    );

  return (
    <Container>
      <Header>
        <p>Yêu cầu tham gia nhóm</p>
        <span> · </span>
        <span>{count}</span>
      </Header>
      <Role>Gần đây</Role>
      <RequestTabPanel pendingRequests={pendingRequests}></RequestTabPanel>
    </Container>
  );
};

export default Requests;
