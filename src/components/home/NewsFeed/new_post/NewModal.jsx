import {
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import Cancel from "@mui/icons-material/Cancel";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaceIcon from "@mui/icons-material/Place";
import { styled as MuiStyled } from "@mui/system";
import styled from "styled-components";
import TagModal from "./TagModal";

import { useUserStore } from "src/store/userStore";
import { useState } from "react";
import useFriendStore from "src/store/useFriendStore";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";

import { PostService } from "src/services/DatabaseService";

import upload from "src/shared/helper/upload";
import uploadLabeledImage from "src/shared/helper/uploadLabeledImage";

const ModalContainer = MuiStyled(Box)`
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

const Header = MuiStyled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

const Content = MuiStyled(Box)`
  margin-top: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const Footer = MuiStyled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  padding-top: 8px;
`;
const ActionRow = MuiStyled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-bottom: 8px;
`;

const IconWrapper = MuiStyled(Box)`
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

const PostButton = MuiStyled(LoadingButton)`
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

const RemoveButton = MuiStyled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const StyledImage = MuiStyled("img")`
  width: 100%;
  height: auto;
`;

const StyledVideo = MuiStyled("video")`
  width: 100%;
  height: auto;
`;

const ImageContainer = MuiStyled(Box)`
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

const LocationText = MuiStyled(Typography)`
  margin: 12px;
  margin-left: 0;
  font-weight: bold;
`;

const FriendWrapper = MuiStyled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px;
  margin-left: 0;
`;

const Hashtag = styled.span`
  color: #27b4fc;
  border: 1px solid #27b4fc;
  padding: 4px;
  border-radius: 16px;
  font-weight: bold;
  display: flex;
`;

const NewModal = ({ open, onClose, groupId, groupName, groupWallpaper }) => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const handleChange = (event) => {
    const inputValue = event.target.value;
    const lastChar = inputValue[inputValue.length - 1];

    if (lastChar === " ") {
      const words = inputValue.trim().split(/\s+/); // Trim to remove trailing space
      const lastWord = words[words.length - 1];

      if (
        lastWord.startsWith("#") &&
        lastWord.length > 1 &&
        hashtags.includes(lastWord) === false
      ) {
        setHashtags((prevHashtags) => [...prevHashtags, lastWord]);
      }

      setText(words.filter((word) => !word.startsWith("#")).join(" ") + " ");
    } else {
      setText(inputValue);
    }
  };

  const { selectedFriends } = useFriendStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile({
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0]),
      type: event.target.files[0].type,
    });
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const [location, setLocation] = useState(null);
  const handleLocationClick = () => {
    if (!location) {
      setLocation("Đang ở Hà Nội");
    } else {
      setLocation(null);
    }
  };

  const post = async () => {
    if (!text && !selectedFile) {
      alert("Bạn chưa nhập nội dung bài viết");
      return;
    }
    setLoading(true);
    const res = selectedFile?.type.startsWith("video/")
      ? await upload(selectedFile.file)
      : null;
    const data = {
      authorId: currentUserId,
      authorName: currentUser.username,
      authorAvatar: currentUser.avatar,
      ...(text !== "" && { text: text }),
      ...(selectedFile?.type.startsWith("video/") && { video: res }),
      hasImage: selectedFile?.type.startsWith("image/") ? true : false,
      ...(location && { location: location }),
      ...(selectedFriends.length > 0 && {
        stayingWith: selectedFriends.map((friend) => {
          return { id: friend.id, username: friend.username };
        }),
      }),
      tags: hashtags,
      ...(groupId &&
        groupName &&
        groupWallpaper && {
          groupId: groupId,
          groupName: groupName,
          groupWallpaper: groupWallpaper,
        }),
      priority: 0,
    };
    const resID = await PostService.create(data);
    if (selectedFile?.type.startsWith("image/")) {
      const url = await uploadLabeledImage(
        selectedFile.file,
        resID.id,
        "posts"
      );
      await PostService.update(resID.id, { image: url });
    }
    setText("");
    setHashtags([]);
    setSelectedFile(null);
    setLocation(null);
    setLoading(false);
    onClose();
  };

  const [isTagging, setIsTagging] = useState(false);
  const toggleTaggingModal = () => {
    setIsTagging(!isTagging);
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
              value={text}
              onChange={handleChange}
              variant="standard"
              multiline
              fullWidth
              placeholder={currentUser.username + " ơi, bạn đang nghĩ gì thế?"}
              sx={{ marginTop: 2, fontSize: "20px", border: "none" }}
            />
            {selectedFile && (
              <ImageContainer>
                {selectedFile?.type.startsWith("image/") && (
                  <StyledImage src={selectedFile.url} alt="Selected" />
                )}
                {selectedFile?.type.startsWith("video/") && (
                  <StyledVideo controls>
                    <source src={selectedFile.url} type="video/mp4" />
                  </StyledVideo>
                )}
                <RemoveButton onClick={handleRemoveFile}>
                  <Cancel
                    // @ts-ignore
                    color="white"
                  />
                </RemoveButton>
              </ImageContainer>
            )}
          </Content>
          {hashtags.length > 0 && (
            <Box sx={{ padding: "8px", display: "flex", gap: "8px" }}>
              {hashtags.map((hashtag, index) => (
                <Hashtag key={index}>
                  {hashtag}
                  <IconButton
                    sx={{ padding: "4px" }}
                    onClick={() => {
                      setHashtags((prevHashtags) =>
                        prevHashtags.filter((tag) => tag !== hashtag)
                      );
                    }}
                  >
                    <Close
                      sx={{ fontSize: 14 }}
                      // @ts-ignore
                      color="blue"
                    />
                  </IconButton>
                </Hashtag>
              ))}
            </Box>
          )}
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
                  <label
                    htmlFor="file-input"
                    style={{ height: "24px", cursor: "pointer" }}
                  >
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
            <PostButton loading={loading} onClick={post}>
              Đăng
            </PostButton>
          </Footer>
        </ModalContainer>
      )}
    </Modal>
  );
};

export default NewModal;
