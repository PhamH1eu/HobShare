import { Box, Typography, Button, Avatar, Skeleton } from "@mui/material";
import styled from "styled-components";

import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import { useNavigate } from "react-router-dom";
import useMembersCount from "src/shared/hooks/fetch/group/useMemberCount";

const GroupContainer = styled(Box)`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GroupInfo = styled(Box)`
  display: flex;
  align-items: center;
`;

const GroupDetails = styled(Box)`
  margin-left: 16px;
`;

export const HitGroup = ({ hit }) => {
  const navigate = useNavigate();
  const { membersCount, isLoading } = useMembersCount(
    getPropertyByPath(hit, "objectID")
  );

  return (
    <GroupContainer>
      <GroupInfo>
        <Avatar src={getPropertyByPath(hit, "wallpaper")} />
        <GroupDetails>
          <Typography variant="h6">{getPropertyByPath(hit, "name")}</Typography>
          {isLoading ? (
            <Skeleton animation="wave" width={80} height={20} />
          ) : (
            <Typography variant="body2" color="textSecondary">
              {membersCount} thành viên
            </Typography>
          )}
        </GroupDetails>
      </GroupInfo>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/group/${getPropertyByPath(hit, "objectID")}`)}
      >
        Xem nhóm
      </Button>
    </GroupContainer>
  );
};
