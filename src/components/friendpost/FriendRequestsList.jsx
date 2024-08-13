import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)`
  width: 180px;
  margin: 5px;
`;

const StyledButton = styled(Button)`
  width: 97%;
  font-weight: 600;

  &:hover {
    background-color: #e4e6e9;
  }
`;

const FriendRequestCard = ({ name, mutualFriends, avatarUrl }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar alt={name} src={avatarUrl} />
          <Box marginLeft="10px">
            <Typography variant="p" component="div" sx={{fontSize: '0.8rem', fontWeight: '600'}}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mutualFriends} bạn chung
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ fontWeight: 600 }}
        >
          Xác nhận
        </Button>
        <Button
          variant="outlined"
          color="greyIcon"
          size="small"
          sx={{ fontWeight: 600 }}
        >
          Xóa
        </Button>
      </CardActions>
    </StyledCard>
  );
};

const FriendRequestList = () => {
  const friendRequests = [
    { name: "Khánh Ly", mutualFriends: 2, avatarUrl: "/photos/photo01.jpg" },
    {
      name: "Phạm Minh Thư",
      mutualFriends: 31,
      avatarUrl: "/photos/photo02.jpg",
    },
    { name: "Như Quỳnhh", mutualFriends: 2, avatarUrl: "/photos/photo03.jpg" },
    { name: "Phạm Mỹ", mutualFriends: 2, avatarUrl: "/photos/photo04.jpg" },
    { name: "Bàn Hiếu", mutualFriends: 45, avatarUrl: "/photos/photo05.jpg" },
    { name: "Khánh Linh", mutualFriends: 1, avatarUrl: "/photos/photo06.jpg" },
    { name: "Quang Huy", mutualFriends: 17, avatarUrl: "/photos/photo07.jpg" },
    { name: "Trịnh Thảo", mutualFriends: 14, avatarUrl: "/photos/photo08.jpg" },
  ];

  return (
    <Box marginTop="15px">
      <Typography variant="h6" sx={{ fontWeight: 600, margin: '5px' }}>
        Lời mời kết bạn
      </Typography>
      <Grid container spacing={1}>
        {friendRequests.map((request, index) => (
          <Grid item key={index}>
            <FriendRequestCard
              name={request.name}
              mutualFriends={request.mutualFriends}
              avatarUrl={request.avatarUrl}
            />
          </Grid>
        ))}
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
      <Typography variant="h6" sx={{ fontWeight: 600, margin: '5px' }}>
        Bài viết của bạn bè
      </Typography>
    </Box>
  );
};

export default FriendRequestList;
