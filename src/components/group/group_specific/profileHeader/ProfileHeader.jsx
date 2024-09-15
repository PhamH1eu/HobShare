import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import { IconButton } from "@mui/material";
import { styled as MuiStyled } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AvatarRow from "./AvatarRow";

import uploadSpecificImage from "src/shared/helper/uploadAvatar";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import { GroupService } from "src/services/SubDatabaseService";
import useMembersCount from "src/shared/hooks/fetch/group/useMemberCount";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60%;
  background: linear-gradient(to bottom, #8c8882 0%, #ffffff 50%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const WallImage = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const WallpaperWrapper = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  transition: filter 0.3s ease-in-out;
  z-index: 1;
`;

const Wallpaper = styled.img`
  width: 100%;
  max-height: 290px;
  height: 100%;
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

const InfoWrapper = styled.div`
  width: 260px;
  display: flex;
  margin: 4px 48px;
`;

const TextWrapper = styled.div``;

const Name = styled.p`
  width: max-content;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Friends = styled.p`
  color: #6f676b;
  font-size: 0.9rem;
  font-weight: 600;
`;

const FileInput = styled.input`
  display: none;
`;

const ProfileHeader = () => {
  const { currentUserId } = useUserStore();
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const { membersCount } = useMembersCount(groupId);
  const isAdmin = group.admins.some((admin) => admin.userId === currentUserId);

  const [isWallpaperHovered, setIsWallpaperHovered] = useState(false);

  const handleWallpaperUpload = async (event) => {
    const file = event.target.files[0];
    const url = await uploadSpecificImage(file, group.id, "wallpaper.jpg");
    if (url !== group.wallpaper) {
      GroupService.updateDocument(group.id, {
        wallpaper: url,
      });
    }
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <WallImage>
        {isAdmin ? (
          <WallpaperWrapper
            onMouseEnter={() => setIsWallpaperHovered(true)}
            onMouseLeave={() => setIsWallpaperHovered(false)}
          >
            <Wallpaper
              src={group.wallpaper || "/background.png"}
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
          <Wallpaper src={group.wallpaper || "/background.png"} />
        )}
        <InfoWrapper>
          <TextWrapper>
            <Name>{group.name}</Name>
            <Friends>{membersCount} thành viên</Friends>
          </TextWrapper>
        </InfoWrapper>
      </WallImage>
      <AvatarRow isAdmin={isAdmin}/>
    </HeaderWrapper>
  );
};

export default ProfileHeader;
