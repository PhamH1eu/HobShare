import {
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Cancel from "@mui/icons-material/Cancel";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaceIcon from "@mui/icons-material/Place";
import { styled } from "@mui/system";
import TagModal from "./TagModal";

import { useUserStore } from "src/store/userStore";
import { useRef, useState } from "react";
import useFriendStore from "src/store/useFriendStore";

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

const Content = styled(Box)`
  margin-top: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const Footer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  padding-top: 8px;
`;
const ActionRow = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-bottom: 8px;
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 8px;

  svg {
    color: #45bd62;
    font-size: 24px;
  }

  &:hover {
    background-color: #e4e6eb;
    border-radius: 50%;
  }
`;

const PostButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: #6ec924;
  color: white;
  text-transform: none;
  font-weight: bold;
  border-radius: 10px;

  &:hover {
    background-color: #7bde2a;
  }
`;

const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const StyledImage = styled("img")`
  width: 100%;
  height: auto;
`;

const ImageContainer = styled(Box)`
  position: relative;
  margin: 8px;
  back
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;

  img {
    border-radius: 6px;
  }
`;

const LocationText = styled(Typography)`
  margin: 12px;
  margin-left: 0;
  font-weight: bold;
`;

const FriendWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px;
  margin-left: 0;
`;

const NewModal = ({ open, onClose }) => {
  const { currentUser } = useUserStore();
  const { selectedFriends } = useFriendStore();
  const textRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const post = () => {
    const text = textRef.current.value;
    if (!text && !selectedFile) {
      return;
    }
    console.log(text, selectedFile);
  };

  const [isTagging, setIsTagging] = useState(false);

  const toggleTaggingModal = () => {
    setIsTagging(!isTagging);
  };

  const [location, setLocation] = useState(null);
  const handleLocationClick = () => {
    if (!location) {
      setLocation("Đang ở Hà Nội");
    } else {
      setLocation(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {isTagging ? (
        <TagModal toggleTaggingModal={toggleTaggingModal} />
      ) : (
        <ModalContainer>
          <Header>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Tạo bài viết
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Header>
          <Content>
            <Box display="flex" alignItems="center">
              <Avatar src={currentUser.avatar} />
              <Typography
                variant="body1"
                sx={{ marginLeft: 1, fontWeight: "600", fontSize: "1.1rem" }}
              >
                {currentUser.username}
              </Typography>
            </Box>
            <TextField
              inputRef={textRef}
              variant="standard"
              multiline
              fullWidth
              placeholder="Phạm ơi, bạn đang nghĩ gì thế?"
              sx={{ marginTop: 2, fontSize: "20px", border: "none" }}
            />
            {selectedFile && (
              <ImageContainer>
                <StyledImage src={selectedFile} alt="Selected" />
                <RemoveButton onClick={handleRemoveFile}>
                  <Cancel
                    // @ts-ignore
                    color="white"
                  />
                </RemoveButton>
              </ImageContainer>
            )}
          </Content>
          {location && <LocationText>{location}</LocationText>}
          {selectedFriends.length > 0 && (
            <FriendWrapper>
              Cùng với
              {selectedFriends.map((friend) => (
                <a
                  key={friend.id}
                  href={`/profile/${friend.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {friend.username}
                </a>
              ))}
            </FriendWrapper>
          )}
          <Footer>
            <ActionRow>
              <Typography variant="body2" fontWeight="bold">
                Thêm vào bài viết của bạn
              </Typography>
              <IconWrapper sx={{ marginLeft: "auto" }}>
                <IconButton>
                  <label htmlFor="file-input" style={{ height: "24px" }}>
                    <PhotoLibraryIcon />
                  </label>
                </IconButton>
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  id="file-input"
                  onChange={handleFileChange}
                />
              </IconWrapper>
              <IconWrapper>
                <IconButton size="small" onClick={toggleTaggingModal}>
                  <PersonAddIcon />
                </IconButton>
              </IconWrapper>
              <IconWrapper>
                <IconButton size="small" onClick={handleLocationClick}>
                  <PlaceIcon />
                </IconButton>
              </IconWrapper>
            </ActionRow>
            <PostButton onClick={post}>Đăng</PostButton>
          </Footer>
        </ModalContainer>
      )}
    </Modal>
  );
};

export default NewModal;
