import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShareIcon from "@mui/icons-material/Share";

const Container = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  padding: 0 48px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  border: 2px solid white;
`;

const Action = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #0099ff;
    color: white;
    text-transform: none;
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 20px;

    &:hover {
      background-color: #007acc;
    }
  }
`;

const ShareButton = styled(Button)`
  && {
    background-color: #f0f0f0;
    color: black;
    text-transform: none;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 500;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const StatusButton = styled(Button)`
  && {
    background-color: #f0f0f0;
    color: black;
    text-transform: none;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 500;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const AvatarRow = () => {
  const avatars = [
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
  ];

  return (
    <Container>
      <AvatarGroup>
        {avatars.map((src, index) => (
          <StyledAvatar key={index} src={src} />
        ))}
      </AvatarGroup>
      <Action>
        <StyledButton>+ Mời</StyledButton>
        <ShareButton startIcon={<ShareIcon />}>Chia sẻ</ShareButton>
        <StatusButton endIcon={<ArrowDropDownIcon />}>Đã tham gia</StatusButton>
        <StatusButton endIcon={<ArrowDropDownIcon />} />
      </Action>
    </Container>
  );
};

export default AvatarRow;
