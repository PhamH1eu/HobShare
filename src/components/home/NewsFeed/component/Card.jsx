import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button, Skeleton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import useModal from "src/shared/hooks/util/useModal";
import AddRequestModal from "src/shared/components/friend_button/AddRequestModal";
import useSentRequest from "src/shared/hooks/fetch/friend/useSentRequest";
import useCancelFriendRequestMutation from "src/shared/hooks/mutation/friend/useCancelFriendRequestMutation";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";

export default function UserCard({ userId }) {
  const navigate = useNavigate();
  const { open, handleClose, handleOpen } = useModal();
  const { sentRequests, isLoadingSent } = useSentRequest();
  const mutation = useCancelFriendRequestMutation();
  const { data: user, isLoading } = useUserInfo(userId);

  if (isLoading) {
    return (
      <Card sx={{ maxWidth: "11vw" }}>
        <Skeleton variant="rounded" animation="wave" height="222px" />
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: "11vw" }}>
      <CardActionArea onClick={() => navigate(`/profile/${user.id}`)}>
        <CardMedia
          component="img"
          height="130"
          image={user.avatar}
          alt="avatar"
        />
        <CardContent
          style={{ padding: 0, textAlign: "start", paddingLeft: "7px" }}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            style={{ marginBottom: 0 }}
          >
            {user.username}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            10 bạn chung
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ justifyContent: "center", padding: 0, paddingBottom: "10px" }}
      >
        {isLoadingSent ? (
          <Skeleton variant="rounded" animation="wave" />
        ) : sentRequests.some((request) => request.id === user.id) ? (
          <LoadingButton
            size="small"
            loading={mutation.isLoading}
            style={{ backgroundColor: "#e8e4ec" }}
            onClick={() => {
              mutation.mutate({ receiverId: user.id });
            }}
          >
            Huỷ
          </LoadingButton>
        ) : (
          <Button
            size="small"
            // @ts-ignore
            color="white"
            style={{ backgroundColor: "green" }}
            onClick={handleOpen}
          >
            Kết bạn
          </Button>
        )}
      </CardActions>
      <AddRequestModal
        open={open}
        handleClose={handleClose}
        receiverId={user.id}
      />
    </Card>
  );
}
