import {
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserStore } from "src/store/userStore";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";
import Preview from "./Preview";
import FriendSuggestions from "./Suggestion";
import { Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Styled Components
const LeftPanel = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "white",
  height: "calc(100vh - 64px)",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const CreateButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: "auto",
}));

const AvatarGroup = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  gap: "16px",
});

// Main Component
const GroupCreationPage = () => {
  const navigate = useNavigate();
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  const [name, setName] = useState("");
  const [members, setMembers] = useState([currentUser]);

  return (
    <Grid container sx={{ marginTop: "64px", overflowX: "hidden" }}>
      {/* Left Side */}
      <Grid item xs={3}>
        <LeftPanel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "-8px",
            }}
          >
            <IconButton onClick={() => navigate("/group")}>
              <Cancel sx={{ width: "40px", height: "40px" }} />
            </IconButton>
            <HeaderText variant="h5">Tạo nhóm</HeaderText>
          </div>
          <AvatarGroup>
            <Avatar src={currentUser.avatar} sx={{ marginTop: "12px" }}>
              <AccountCircleIcon />
            </Avatar>
            <div style={{ marginTop: "10px" }}>
              <Typography variant="body1">{currentUser.username}</Typography>
              <Typography variant="body2" color="textSecondary">
                Quản trị viên
              </Typography>
            </div>
          </AvatarGroup>
          <TextField
            fullWidth
            label="Tên nhóm"
            variant="outlined"
            margin="normal"
            onChange={(e) => setName(e.target.value)}
          />
          <FriendSuggestions />
          <CreateButton variant="contained" color="primary" disabled>
            Tạo
          </CreateButton>
        </LeftPanel>
      </Grid>

      {/* Right Side */}
      <Grid item xs={8}>
        <Preview name={name} members={members} />
      </Grid>
    </Grid>
  );
};

export default GroupCreationPage;
