import { Grid, TextField, Avatar, Typography, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
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

const HeaderText = styled(Typography)(() => ({
  fontWeight: "bold",
}));

const CreateButton = styled(LoadingButton)(() => ({
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

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [wallpaper, setWallpaper] = useState(
    "https://www.facebook.com/images/groups/groups-default-cover-photo-2x.png"
  );

  const createGroup = () => {
    setLoading(true);
    // get group id
    const id = "123";
    setLoading(false);
    navigate(`/group/${id}`);
  };

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
          <TextField
            fullWidth
            label="Mô tả"
            variant="outlined"
            margin="normal"
            onChange={(e) => setDescription(e.target.value)}
          />
          <FriendSuggestions
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <CreateButton
            variant="contained"
            color="primary"
            onClick={createGroup}
            disabled={name === ""}
          >
            Tạo
          </CreateButton>
        </LeftPanel>
      </Grid>

      {/* Right Side */}
      <Grid item xs={8}>
        <Preview
          name={name}
          description={description}
          members={selectedUsers}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
        />
      </Grid>
    </Grid>
  );
};

export default GroupCreationPage;
