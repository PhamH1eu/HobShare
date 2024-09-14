import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import useMembers from "src/shared/hooks/fetch/group/useMembers";
import { useParams } from "react-router-dom";
import CircularLoading from "src/shared/components/Loading";
import { useUserStore } from "src/store/userStore";

import { useState, useEffect } from "react";
import { GroupService } from "src/services/SubDatabaseService";
import DeleteButton from "./buttons/DeleteButton";
import InviteButtonPlus from "./buttons/InviteButton";
import JoinedButton from "./buttons/JoinedButton";
import PendingButton from "./buttons/PendingButton";
import JoinButton from "./buttons/JoinButton";

const Container = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  padding: 0 48px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  border: 2px solid white;
`;

const Action = styled.div`
  display: flex;
  gap: 10px;
`;

const AvatarRow = ({ isAdmin }) => {
  const { groupId } = useParams();
  const { currentUserId } = useUserStore();
  const { members, isLoading } = useMembers(groupId);

  const [status, setStatus] = useState("");
  useEffect(() => {
    GroupService.checkExistSubCollection(
      `${groupId}/members/${currentUserId}`
    ).then((res) => {
      if (res || isAdmin) {
        setStatus("joined");
      } else {
        GroupService.checkExistSubCollection(
          `${groupId}/pendings/${currentUserId}`
        ).then((res) => {
          if (res) {
            setStatus("pending");
          } else {
            setStatus("outsider");
          }
        });
      }
    });
  }, [groupId, currentUserId, isAdmin]);

  const renderActions = () => {
    switch (status) {
      case "joined":
        return (
          <Action>
            <InviteButtonPlus />
            <JoinedButton isAdmin={isAdmin} />
            <DeleteButton isAdmin={isAdmin} />
          </Action>
        );
      case "pending":
        return (
          <Action>
            <PendingButton />
          </Action>
        );
      case "outsider":
        return (
          <Action>
            <JoinButton />
          </Action>
        );
      default:
        return null;
    }
  };

  if (isLoading) return <CircularLoading />;

  return (
    <Container>
      <AvatarGroup>
        {members.slice(0, 10).map((user, index) => (
          <StyledAvatar key={index} src={user.avatar} />
        ))}
      </AvatarGroup>
      {renderActions()}
    </Container>
  );
};

export default AvatarRow;
