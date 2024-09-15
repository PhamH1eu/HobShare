import { Button } from "@mui/material";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { GroupService } from "src/services/SubDatabaseService";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import { useUserStore } from "src/store/userStore";
import styled from "styled-components";

const StatusButton = styled(Button)`
  && {
    background-color: #e0dcdc;
    color: black;
    text-transform: none;
    border-radius: 8px;
    font-weight: bold;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const JoinButton = () => {
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const handleJoin = async () => {
    await GroupService.createSubCollection(`${groupId}/pendingRequests/${currentUserId}`, {
      username: currentUser.username,
      avatar: currentUser.avatar,
      userId: currentUserId,
    });
    queryClient.invalidateQueries("groupStatus");
  };
  return <StatusButton onClick={handleJoin}>Tham gia</StatusButton>;
};

export default JoinButton;
