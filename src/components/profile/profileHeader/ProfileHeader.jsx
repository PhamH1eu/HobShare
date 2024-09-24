import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import { IconButton } from "@mui/material";
import { styled as MuiStyled } from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import uploadSpecificImage from "src/shared/helper/uploadAvatar";

import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import AddButton from "./component/AddButton";
import CancelButton from "./component/CancelButton";
import FriendButton from "./component/FriendButton";
import MessageButton from "./component/MessageButton";
import useUserFriend from "src/shared/hooks/fetch/friend/useUserFriend";
import useSentRequest from "src/shared/hooks/fetch/friend/useSentRequest";
import useReceivedRequest from "src/shared/hooks/fetch/friend/useReceivedRequest";
import CircularLoading from "src/shared/components/Loading";
import AcceptButton from "./component/AcceptButton";
import DenyButton from "./component/DenyButton";

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

const WallpaperWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  transition: filter 0.3s ease-in-out;
  z-index: 1;
`;

const Wallpaper = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 0 0 10px 10px;
`;

const IconWrapper = MuiStyled(IconButton)`
  position: absolute;
  top: 30%;
  left: 48%;
  width: 50px;
  height: 50px;
  padding-bottom: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  opacity: ${({
    // @ts-ignore
    isHovered,
  }) => (isHovered ? 1 : 0)};

  svg {
    cursor: pointer;
    font-size: 40px;
    color: white;
  }
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  padding: 5px;
  background: white;
  position: relative;
`;

const StyledAvatar = MuiStyled(Avatar)`
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

const CameraIcon = MuiStyled(CameraAltIcon)`
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

const ActionWrapper = styled.div`
  position: absolute;
  right: 20px;
  bottom: 40px;
  border-radius: 8px;
  padding: 10px;
  width: 100px;
  height: 40px;
`;

const renderAction = () => {
  const { userId } = useParams();
  const { friends, isLoading } = useUserFriend();
  const { sentRequests, isLoadingSent } = useSentRequest();
  const { receivedRequests, isLoadingReceived } = useReceivedRequest();

  if (isLoading || isLoadingSent || isLoadingReceived) {
    return (
      <ActionWrapper>
        <CircularLoading />
      </ActionWrapper>
    );
  }

  // @ts-ignore
  if (friends.some((friend) => friend.id === userId)) {
    return (
      <>
        <FriendButton friendId={userId} />
        <MessageButton />
      </>
    );
  }

  // @ts-ignore
  if (sentRequests.some((request) => request.id === userId)) {
    return <CancelButton receiverId={userId} />;
  }

  // @ts-ignore
  if (receivedRequests.some((request) => request.id === userId)) {
    return (
      <>
        <AcceptButton receiverId={userId} />
        <DenyButton senderId={userId} />
      </>
    );
  }

  return <AddButton receiverId={userId} />;
};

const ProfileHeader = () => {
  const { currentUserId } = useUserStore();
  const { userId } = useParams();
  const isViewingOwnProfile = userId === currentUserId;
  const { data: user } = useUserInfo(userId);

  const [isHovered, setIsHovered] = useState(false);
  const [isWallpaperHovered, setIsWallpaperHovered] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    await uploadSpecificImage(file, user.id, "avatar.jpg");
    window.location.reload();
  };

  const handleWallpaperUpload = async (event) => {
    const file = event.target.files[0];
    await uploadSpecificImage(file, user.id, "wallpaper.jpg");
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <WallImage>
        {isViewingOwnProfile ? (
          <WallpaperWrapper
            onMouseEnter={() => setIsWallpaperHovered(true)}
            onMouseLeave={() => setIsWallpaperHovered(false)}
          >
            <Wallpaper
              src={user.wallpaper || "/background.png"}
              // @ts-ignore
              isHovered={isWallpaperHovered}
            />
            <IconWrapper
              className="wallpaper-camera-icon"
              // @ts-ignore
              isHovered={isWallpaperHovered}
            >
              <label htmlFor="wallpaper-upload">
                <CameraAltIcon />
              </label>
            </IconWrapper>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleWallpaperUpload}
              id="wallpaper-upload"
            />
          </WallpaperWrapper>
        ) : (
          <Wallpaper src={user.wallpaper || "/background.png"} />
        )}
        <InfoWrapper>
          {isViewingOwnProfile ? (
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
                  src={user.avatar}
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
          ) : (
            <AvatarWrapper>
              <StyledAvatar src={user.avatar} />
            </AvatarWrapper>
          )}
          <TextWrapper>
            <Name>{user.username}</Name>
            <Friends>329 người bạn</Friends>
          </TextWrapper>
        </InfoWrapper>
        {!isViewingOwnProfile && renderAction()}
      </WallImage>
    </HeaderWrapper>
  );
};

export default ProfileHeader;
