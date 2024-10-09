import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import { IconButton, Skeleton } from "@mui/material";
import { styled as MuiStyled } from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import uploadSpecificImage from "src/shared/helper/uploadAvatar";

import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import AddButton from "../../../shared/components/friend_button/AddButton";
import CancelButton from "../../../shared/components/friend_button/CancelButton";
import FriendButton from "../../../shared/components/friend_button/FriendButton";
import MessageButton from "../../../shared/components/friend_button/MessageButton";
import useUserFriend from "src/shared/hooks/fetch/friend/useUserFriend";
import useSentRequest from "src/shared/hooks/fetch/friend/useSentRequest";
import useReceivedRequest from "src/shared/hooks/fetch/friend/useReceivedRequest";
import CircularLoading from "src/shared/components/Loading";
import AcceptButton from "../../../shared/components/friend_button/AcceptButton";
import DenyButton from "../../../shared/components/friend_button/DenyButton";
import useSpecificUserFriend from "src/shared/hooks/fetch/friend/useSpecificUserFriend";

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
  width: max-content;
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

  span {
    width: 24px !important;
    height: 24px !important;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const Actions = () => {
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
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "40px",
          display: "flex",
          gap: "10px",
        }}
      >
        <FriendButton friendId={userId} />
        <MessageButton userId={userId} />
      </div>
    );
  }

  // @ts-ignore
  if (sentRequests.some((request) => request.id === userId)) {
    return (
      <div style={{ position: "absolute", right: "20px", bottom: "40px" }}>
        <CancelButton receiverId={userId} />
      </div>
    );
  }

  // @ts-ignore
  if (receivedRequests.some((request) => request.id === userId)) {
    return (
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "40px",
          display: "flex",
          gap: "10px",
        }}
      >
        <AcceptButton receiverId={userId} />
        <DenyButton senderId={userId} />
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", right: "20px", bottom: "40px" }}>
      <AddButton receiverId={userId} />
    </div>
  );
};

const ProfileHeader = () => {
  const { currentUserId } = useUserStore();
  const { userId } = useParams();
  const isViewingOwnProfile = userId === currentUserId;
  const { data: user } = useUserInfo(userId);
  const { friends, isLoading } = useSpecificUserFriend(userId);

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
            <Friends>
              {isLoading ? (
                <Skeleton width="60px" height="20px" animation="wave" />
              ) : (
                friends.length + " người bạn"
              )}
            </Friends>
          </TextWrapper>
        </InfoWrapper>
        {!isViewingOwnProfile && <Actions />}
      </WallImage>
    </HeaderWrapper>
  );
};

export default ProfileHeader;
