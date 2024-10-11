import { Box, Typography, Avatar, Skeleton } from "@mui/material";
import styled from "styled-components";

import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import StyledLink from "src/shared/components/StyledLink";
import AcceptButton from "src/shared/components/friend_button/AcceptButton";
import CancelButton from "src/shared/components/friend_button/CancelButton";
import DenyButton from "src/shared/components/friend_button/DenyButton";
import MessageButton from "src/shared/components/friend_button/MessageButton";
import CircularLoading from "src/shared/components/Loading";
import useReceivedRequest from "src/shared/hooks/fetch/friend/useReceivedRequest";
import useSentRequest from "src/shared/hooks/fetch/friend/useSentRequest";
import useUserFriend from "src/shared/hooks/fetch/friend/useUserFriend";
import { useUserStore } from "src/store/userStore";
import SpecialAddButton from "./SpecialAddButton";
import useCommonFriend from "src/shared/hooks/fetch/friend/useCommonFriend";

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

const Actions = ({ userId, handleOpen }) => {
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
      <SpecialAddButton handleOpen={handleOpen} />
    </div>
  );
};

const CommonFriend = ({ userId }) => {
  const { commonsFriend, isLoading } = useCommonFriend(userId);

  return isLoading ? (
    <Skeleton variant="rounded" animation="wave" width="60px" height="20px" />
  ) : (
    <Typography variant="body2" color="textSecondary">
      {commonsFriend} bạn chung
    </Typography>
  );
};

export const HitUser = ({ hit, handleOpen }) => {
  const { currentUserId } = useUserStore();

  if (getPropertyByPath(hit, "objectID") == currentUserId) return null;

  return (
    <FriendContainer>
      <FriendInfo>
        <StyledLink to={`/profile/${getPropertyByPath(hit, "objectID")}`}>
          <Avatar src={getPropertyByPath(hit, "avatar")} />
        </StyledLink>
        <FriendDetails>
          <StyledLink to={`/profile/${getPropertyByPath(hit, "objectID")}`}>
            <Typography variant="h6">
              {getPropertyByPath(hit, "username")}
            </Typography>
          </StyledLink>
          <CommonFriend userId={getPropertyByPath(hit, "objectID")} />
          {getPropertyByPath(hit, "bio.education") && (
            <Typography variant="body2" color="textSecondary">
              Học tập tại {getPropertyByPath(hit, "bio.education")}
            </Typography>
          )}
          {getPropertyByPath(hit, "bio.work") && (
            <Typography variant="body2" color="textSecondary">
              Đang làm việc ở {getPropertyByPath(hit, "bio.work")}
            </Typography>
          )}
        </FriendDetails>
      </FriendInfo>
      <Actions
        userId={getPropertyByPath(hit, "objectID")}
        handleOpen={handleOpen}
      />
    </FriendContainer>
  );
};
