import { Box, Typography, Button, Avatar } from "@mui/material";
import styled from "styled-components";

import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import StyledLink from "src/shared/components/StyledLink";

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

export const HitUser = ({ hit, handleOpen }) => {
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
          <Typography variant="body2" color="textSecondary">
            24 mutual friends
          </Typography>
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Kết bạn
      </Button>
    </FriendContainer>
  );
};
