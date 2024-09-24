import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useReceivedRequest from "src/shared/hooks/fetch/friend/useReceivedRequest";
import CircularLoading from "src/shared/components/Loading";
import useAcceptRequestMutation from "src/shared/hooks/mutation/friend/useAcceptRequestMutation";
import useDenyFriendRequestMutation from "src/shared/hooks/mutation/friend/useDenyFriendRequestMutation";

const StyledCard = styled(Card)`
  width: 180px;
  margin: 5px;
`;

const StyledButton = styled(LoadingButton)`
  width: 97%;
  font-weight: 600;

  &:hover {
    background-color: #e4e6e9;
  }
`;

const FriendRequestCard = ({ name, mutualFriends, avatarUrl, senderId }) => {
  const mutationAccept = useAcceptRequestMutation();
  const mutationDeny = useDenyFriendRequestMutation();

  const accept = () => {
    if (mutationAccept.isLoading) return;
    mutationAccept.mutate({ fromUserId: senderId });
  };
  const deny = () => {
    if (mutationDeny.isLoading) return;
    mutationDeny.mutate({ senderId });
  };

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar alt={name} src={avatarUrl} />
          <Box marginLeft="10px">
            <Typography
              component="div"
              sx={{ fontSize: "0.8rem", fontWeight: "600" }}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mutualFriends} bạn chung
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <LoadingButton
          variant="contained"
          color="primary"
          size="small"
          sx={{ fontWeight: 600 }}
          loading={mutationAccept.isLoading}
          onClick={accept}
        >
          Xác nhận
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          color="greyIcon"
          size="small"
          sx={{ fontWeight: 600 }}
          loading={mutationDeny.isLoading}
          onClick={deny}
        >
          Xóa
        </LoadingButton>
      </CardActions>
    </StyledCard>
  );
};

const FriendRequestList = () => {
  const { receivedRequests, isLoadingReceived } = useReceivedRequest();

  return (
    <Box marginTop="15px" flex="2" margin="0 80px">
      <Typography variant="h6" sx={{ fontWeight: 600, margin: "5px" }}>
        Lời mời kết bạn
      </Typography>
      <Grid container spacing={1}>
        {isLoadingReceived ? (
          <CircularLoading />
        ) : (
          receivedRequests.map((request, index) => (
            <Grid item key={index}>
              <FriendRequestCard
                senderId={request.id}
                name={request.senderName}
                mutualFriends={31}
                avatarUrl={request.senderAvatar}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <StyledButton
          variant="text"
          color="primary"
          endIcon={<ExpandMoreIcon color="primary" />}
        >
          Xem thêm
        </StyledButton>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, margin: "5px" }}>
        Bài viết của bạn bè
      </Typography>
    </Box>
  );
};

export default FriendRequestList;
