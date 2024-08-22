import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import useModal from "src/shared/hooks/useModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddRequestModal from "./AddRequestModal";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import uploadAvatar from "src/shared/helper/uploadAvatar";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70%;
  background: linear-gradient(to bottom, #8c8882 0%, #ffffff 50%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const WallImage = styled.div`
  width: 65%;
  height: 100%;
  position: relative;
`;

const Wallpaper = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 0 0 10px 10px;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  padding: 5px;
  background: white;
  position: relative;
`;

const StyledAvatar = styled(Avatar)`
  width: 140px;
  height: 140px;
  transition: filter 0.3s ease-in-out;
  filter: ${({
    // @ts-ignore
    isHovered,
  }) => (isHovered ? "brightness(0.5)" : "none")};
`;

const InfoWrapper = styled.div`
  width: 260px;
  display: flex;
  position: absolute;
  left: 70px;
  bottom: 0;
`;

const AddFriend = styled.button`
  position: absolute;
  right: 20px;
  bottom: 40px;
  background-color: #6ec924;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  position: absolute;
  left: 160px;
  top: 50px;
`;

const Name = styled.p`
  font-size: 2.7rem;
  font-weight: 700;
`;

const Friends = styled.p`
  color: #6f676b;
  font-size: 0.9rem;
  font-weight: 600;
`;

const CameraIcon = styled(CameraAltIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
  opacity: ${({
    // @ts-ignore
    isHovered,
  }) => (isHovered ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  z-index: 2;
`;

const FileInput = styled.input`
  display: none;
`;

const ProfileHeader = () => {
  const { currentUser } = useUserStore();
  const { userId } = useParams();
  const isViewingOwnProfile = userId === currentUser.id;

  const { open, handleClose, handleOpen } = useModal();

  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    await uploadAvatar(file, currentUser.id);
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <WallImage>
        <Wallpaper src="/background.png" />
        <InfoWrapper>
          <AvatarWrapper
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <label
              style={{ cursor: "pointer" }}
              htmlFor="avatar-upload"
              // @ts-ignore
            >
              <StyledAvatar
                // @ts-ignore
                isHovered={isHovered}
                src={currentUser.avatar}
              />
              <CameraIcon
                // @ts-ignore
                isHovered={isHovered}
              />
            </label>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="avatar-upload"
            />
          </AvatarWrapper>
          <TextWrapper>
            <Name>{currentUser.username}</Name>
            <Friends>329 người bạn</Friends>
          </TextWrapper>
        </InfoWrapper>
        {!isViewingOwnProfile && (
          <AddFriend onClick={handleOpen}>
            <PersonAddIcon
              // @ts-ignore
              color="white"
            />
            Thêm bạn bè
          </AddFriend>
        )}
      </WallImage>
      <AddRequestModal open={open} handleClose={handleClose} />
    </HeaderWrapper>
  );
};

export default ProfileHeader;
