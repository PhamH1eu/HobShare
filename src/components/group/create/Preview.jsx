import {
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import NewPostInput from "./NewPostHolder";

const RightPanel = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  marginLeft: theme.spacing(8),
  height: "calc(100vh - 64px)",
  borderRadius: theme.spacing(1),
  width: "100%",
}));

const HeaderText = styled(Typography)(() => ({
  fontWeight: "bold",
}));

const PreviewCard = styled(Card)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
}));

const WallpaperWrapper = styled(Box)({
  height: "200px",
  width: "100%",
  backgroundColor: "#f5f5f5",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  borderRadius: "5px 5px 0 0",
});

const StyledButtonWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const StyledButton = styled(IconButton)({
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  padding: "20px",
  color: "white",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

const Container = styled(Box)({
  borderRadius: "0 0 8px 8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
});

const Header = styled(Box)({
  marginBottom: "16px",
  paddingLeft: "16px",
});

const GroupName = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333", // Dark grey for text
});

const PrivacyText = styled(Typography)({
  fontSize: "14px",
  color: "#777", // Medium grey for privacy text
});

const TabsContainer = styled(Box)({
  display: "flex",
  marginBottom: "8px",
});

const Tab = styled(Typography)({
  padding: "8px 16px",
  color: "#777", // Medium grey for inactive tabs
});

const VisibilityContainer = styled(Box)({
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "5px",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  width: "60%",
  maxHeight: "200px",
  overflowY: "auto",
  overflowX: "hidden",
});

const VisibilityTitle = styled(Typography)({
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "8px",
});

const VisibilityItem = styled(Typography)({
  fontSize: "14px",
  wordWrap: "break-word",
  color: "#333",
  marginBottom: "4px",
});

const GroupComponent = ({ name, description, members }) => {
  return (
    <Container>
      <Header>
        <GroupName>{name === "" ? "Tên nhóm" : name}</GroupName>
        <PrivacyText>{members.length + 1} thành viên</PrivacyText>
      </Header>
      <Divider sx={{ marginY: 1 }} />

      <TabsContainer>
        <Tab>Giới thiệu</Tab>
        <Tab>Bài viết</Tab>
        <Tab>Thành viên</Tab>
      </TabsContainer>

      <div
        style={{
          display: "flex",
          gap: "10px",
          backgroundColor: "#f0f2f5",
          padding: "32px",
        }}
      >
        <NewPostInput />
        <VisibilityContainer>
          <VisibilityTitle>Giới thiệu</VisibilityTitle>
          <VisibilityItem>{description}</VisibilityItem>
        </VisibilityContainer>
      </div>
    </Container>
  );
};

const Preview = ({ name, description, members, wallpaper, setWallpaper }) => {
  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWallpaper({
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };
  return (
    <RightPanel>
      <PreviewCard>
        <HeaderText variant="subtitle1">Xem trước</HeaderText>
        <CardContent>
          <WallpaperWrapper
            style={{
              backgroundImage: `url(${wallpaper.url || "/wallpapergroup.jpg"})`,
            }}
          >
            <StyledButtonWrapper>
              <StyledButton
                aria-label="upload picture"
                // @ts-ignore
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleWallpaperChange}
                />
                <PhotoCamera
                  fontSize="large"
                  // @ts-ignore
                  color="white"
                />
              </StyledButton>
            </StyledButtonWrapper>
          </WallpaperWrapper>
          <GroupComponent
            name={name}
            description={description}
            members={members}
          />
        </CardContent>
      </PreviewCard>
    </RightPanel>
  );
};

export default Preview;
