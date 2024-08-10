import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";

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
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
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
  background-color: #0866ff;
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

const ProfileHeader = () => {
  const { currentUser } = useUserStore();
  const { userId } = useParams();
  const isViewingOwnProfile = userId === currentUser.id;

  return (
    <HeaderWrapper>
      <WallImage>
        <Wallpaper src="/background.png" />
        <InfoWrapper>
          <AvatarWrapper>
            <Avatar src={currentUser.avatar} />
          </AvatarWrapper>
          <TextWrapper>
            <Name>{currentUser.username}</Name>
            <Friends>329 người bạn</Friends>
          </TextWrapper>
        </InfoWrapper>
        {!isViewingOwnProfile && (
          <AddFriend>
            <PersonAddIcon
              // @ts-ignore
              color="white"
            />
            Thêm bạn bè
          </AddFriend>
        )}
      </WallImage>
    </HeaderWrapper>
  );
};

export default ProfileHeader;
