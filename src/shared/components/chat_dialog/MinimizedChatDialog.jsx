import React from "react";
import styled from "styled-components";
import {
  Avatar,
  Box,
  Badge,
  styled as MuiStyled,
  IconButton,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";
import { useChatDialogStore } from "src/store/chatDialogStore";

const Wrapper = styled.div`
  position: fixed;
  bottom: 50px;
  right: 40px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
`;

const AvatarWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "4px",
  cursor: "pointer",
  "&:hover .close-button": {
    display: "flex",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  padding: "2px",
  display: "none",
  zIndex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

const OnlineBadge = MuiStyled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const IconButtonStyle = MuiStyled(IconButton)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
  width: "50px",
  height: "50px",

  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

const MinimizedChatDialog = () => {
  const { minimizedChats, maximizeChat, removeMinimizedChat } =
    useChatDialogStore();

  return (
    <Wrapper>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {minimizedChats.map((chat, index) => (
          <AvatarWrapper>
            <OnlineBadge
              key={index}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              invisible={false}
              onClick={() => maximizeChat(chat)}
            >
              <Avatar
                alt="hieu"
                src="/path/to/avatar.png"
                sx={{ width: 45, height: 45 }}
              />
            </OnlineBadge>
            <CloseButton
              className="close-button"
              onClick={() => removeMinimizedChat(chat)}
            >
              <CloseIcon fontSize="small" />
            </CloseButton>
          </AvatarWrapper>
        ))}
        <IconButtonStyle>
          <RateReviewIcon />
        </IconButtonStyle>
      </Box>
    </Wrapper>
  );
};

export default MinimizedChatDialog;
