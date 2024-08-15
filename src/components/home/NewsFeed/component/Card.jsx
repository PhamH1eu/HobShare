import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";

export default function UserCard({ user }) {
  return (
    <Card sx={{ maxWidth: "11vw" }}>
      <CardActionArea>
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
            {user.name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {user.mutualFriends} bạn chung
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ justifyContent: "center", padding: 0, paddingBottom: "10px" }}
      >
        <Button size="small" 
// @ts-ignore
        color="white" style={{ backgroundColor: "green" }}>
          Kết bạn
        </Button>
      </CardActions>
    </Card>
  );
}
