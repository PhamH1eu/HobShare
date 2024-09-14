import { Grid, TextField, Avatar, Typography, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserStore } from "src/store/userStore";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import Preview from "./Preview";
import FriendSuggestions from "./Suggestion";
import { Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { GroupService } from "src/services/SubDatabaseService";
import { UserService } from "src/services/SubDatabaseService";

import uploadSpecificImage from "src/shared/helper/uploadAvatar";

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
  const [wallpaper, setWallpaper] = useState({
    file: null,
    url: null,
  });

  const createGroup = async () => {
    setLoading(true);
    const uid = uuidv4();

    const imageUrl = `/wallpapergroup.jpg`;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const wallpaperFileLocal = new File([blob], "/wallpaper.jpg", {
      type: blob.type,
    });

    const wallpaperurl = await uploadSpecificImage(
      wallpaper.file || wallpaperFileLocal,
      uid,
      "wallpaper.jpg"
    );

    await Promise.all([
      GroupService.createSubCollection(uid, {
        id: uid,
        wallpaper: wallpaperurl,
        name: name,
        description: description,
        admins: [
          {
            userId: currentUser.id,
            username: currentUser.username,
            avatar: currentUser.avatar,
          },
        ],
      }),
      GroupService.batchWrite(`${uid}/members`, selectedUsers),
      UserService.createSubCollection(`${currentUserId}/admingroups/${uid}`, {
        groupId: uid,
        name: name,
        wallpaper: wallpaperurl,
      }),
    ]);
    setLoading(false);
    navigate(`/group/${uid}`);
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
            loading={loading}
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
