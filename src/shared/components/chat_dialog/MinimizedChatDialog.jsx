import styled from "styled-components";
import {
  Avatar,
  Box,
  Badge,
  styled as MuiStyled,
  IconButton,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
// import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";
import { useChatDialogStore } from "src/store/chatDialogStore";

import { useListenChatNotify } from "src/shared/hooks/listen/useListenChat";
import { useEffect, useState } from "react";
import truncateString from "src/shared/helper/truncateString";
import { useUserStore } from "src/store/userStore";
import useChatList from "src/shared/hooks/listen/useChatList";
import UpdateChat from "src/services/UpdateChat";

const Wrapper = styled.div`
  position: fixed;
  bottom: 50px;
  right: 40px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
`;

const AvatarWrapper = MuiStyled(Box)(() => ({
  position: "relative",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover .close-button": {
    display: "flex",
  },
}));

const CloseButton = MuiStyled(IconButton)(() => ({
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

const NotificationBadge = MuiStyled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "red",
    color: "white",
    right: "8px",
    top: "5px",
    borderRadius: "50%",
  },
}));

const CustomWidthTooltip = MuiStyled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    fontSize: "1rem !important",
  },
});

const ChatMinimezed = ({ chat }) => {
  const { currentUserId } = useUserStore();
  const { maximizeChat, removeMinimizedChat } = useChatDialogStore();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [messageToShow, setMessageToShow] = useState("");

  useListenChatNotify(chat.chatId, setMessage);
  const { chats } = useChatList();
  const [currentChatRealtime, setCurrentChatRealtime] = useState();
  useEffect(() => {
    const currentChat = chats.find((item) => item.chatId === chat.chatId);
    setCurrentChatRealtime(currentChat);
  }, [chats, chat]);

  useEffect(() => {
    if (message) {
      // @ts-ignore
      if (message.senderId === currentUserId) {
        // @ts-ignore
        setMessageToShow("Bạn " + (message.text || "đã gửi một phương tiện"));
        setOpen(false);
      } else {
        // @ts-ignore
        setMessageToShow(message.senderName + ": " + (message.text || "đã gửi một phương tiện"));
        setOpen(true);
      }
    }
  }, [message, currentUserId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (open) {
        setOpen(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <CustomWidthTooltip
      placement="left"
      arrow
      TransitionComponent={Zoom}
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      // @ts-ignore
      title={truncateString(messageToShow, 50)}
    >
      <AvatarWrapper
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <OnlineBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          invisible={false}
          onClick={() => {
            // @ts-ignore
            UpdateChat(currentUserId, chat.user.id, chat.chatId, message.text);
            maximizeChat(chat);
          }}
        >
          <NotificationBadge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            variant="dot"
            // @ts-ignore
            invisible={currentChatRealtime?.isSeen}
          >
            <Avatar
              alt="avatar"
              src={chat.user.avatar}
              sx={{ width: 50, height: 50 }}
            />
          </NotificationBadge>
        </OnlineBadge>
        <CloseButton
          className="close-button"
          onClick={() => removeMinimizedChat(chat)}
        >
          <CloseIcon fontSize="small" />
        </CloseButton>
      </AvatarWrapper>
    </CustomWidthTooltip>
  );
};

const MinimizedChatDialog = () => {
  const { minimizedChats } = useChatDialogStore();

  return (
    <Wrapper>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {minimizedChats.map((chat, index) => (
          <ChatMinimezed key={index} chat={chat} />
        ))}
        {/* <IconButtonStyle>
          <RateReviewIcon />
        </IconButtonStyle> */}
      </Box>
    </Wrapper>
  );
};

export default MinimizedChatDialog;
