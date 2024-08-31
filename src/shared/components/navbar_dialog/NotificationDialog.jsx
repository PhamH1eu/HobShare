import { useState } from "react";
import styled from "styled-components";
import StyledLink from "../StyledLink";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { MoreVert } from "@mui/icons-material";
import { Check } from "@mui/icons-material";

const Container = styled(Box)`
  width: 360px;
  background-color: white;
`;

const NotificationHeader = styled(Typography)`
  font-size: 25px;
  font-weight: bold;
  margin: 0px 20px;
`;

const CustomTab = styled(Tab)`
  font-size: 14px;
  font-weight: bold;
  text-transform: none;
`;

const StyledListItem = styled(ListItem)`
  padding: 4px;
  margin: 4px;
  padding-right: 20px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AvatarWrapper = styled(Box)`
  position: relative;
  display: inline-block;
  padding-right: 5px;
  padding-bottom: 5px;
  margin-right: 10px;
`;

const RepliedIcon = styled(ChatBubbleIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #49d06a;
  color: white;
  border-radius: 50%;
  padding: 4px !important;
  font-size: 24px;
`;

const LikeIcon = styled(ThumbUpAlt)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #0492fc;
  color: white;
  border-radius: 50%;
  padding: 4px !important;
  font-size: 24px;
`;

const AddFriendIcon = styled(PersonAdd)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #0492fc;
  color: white;
  border-radius: 50%;
  padding: 4px !important;
  font-size: 24px;
`;

const noti = [
  {
    sourceName: "Nik Nguyen",
    content: "đã phản hồi bình luận của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: false,
    type: "comment",
    url: "/post/2cqvyhc2En5b0nPoNaEE",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã gửi lời mời kết bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: true,
    type: "add",
    url: "/profile/id",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã thích bài viết của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: true,
    type: "like",
    url: "/post/id",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã thích bình luận của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    url: "/post/id",
    isRead: false,
    type: "like",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã phản hồi bình luận của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: false,
    type: "comment",
    url: "/post/2cqvyhc2En5b0nPoNaEE",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã gửi lời mời kết bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: true,
    type: "add",
    url: "/profile/id",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã thích bài viết của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: true,
    type: "like",
    url: "/post/id",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã thích bình luận của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    url: "/post/id",
    isRead: false,
    type: "like",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã phản hồi bình luận của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: false,
    type: "comment",
    url: "/post/2cqvyhc2En5b0nPoNaEE",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã gửi lời mời kết bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: true,
    type: "add",
    url: "/profile/id",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã thích bài viết của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    isRead: true,
    type: "like",
    url: "/post/id",
  },
  {
    sourceName: "Nik Nguyen",
    content: "đã thích bình luận của bạn",
    sourceImage: "https://via.placeholder.com/40",
    createdAt: "2 ngày",
    url: "/post/id",
    isRead: false,
    type: "like",
  },
];

const renderIcon = (type) => {
  switch (type) {
    case "comment":
      return <RepliedIcon />;
    case "like":
      return <LikeIcon />;
    case "add":
      return <AddFriendIcon />;
    default:
      return <RepliedIcon />;
  }
};

const DynamicTag = ({ isRead, children }) => {
  if (isRead) {
    return <Typography variant="body2">{children}</Typography>;
  } else {
    return (
      <Typography
        variant="body2"
        style={{ fontWeight: "bold", color: "#64BB1E" }}
      >
        {children}
      </Typography>
    );
  }
};

const NotificationDialog = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const read = () => {
    noti.forEach((item) => (item.isRead = true));
    handleMenuClose();
  };

  return (
    <TabContext value={value}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NotificationHeader>Thông báo</NotificationHeader>
          <IconButton onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={read}>
              <ListItemIcon>
                <Check style={{ color: "#6ec924" }} />
              </ListItemIcon>
              <Typography variant="inherit">
                Đánh dấu tất cả là đã đọc
              </Typography>
            </MenuItem>
          </Menu>
        </div>
        <TabList onChange={handleChange}>
          <CustomTab label="Tất cả" value="1" />
          <CustomTab label="Chưa đọc" value="2" />
        </TabList>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <List>
            {noti.map((item, index) => (
              <StyledLink key={index} to={item.url}>
                <StyledListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <AvatarWrapper>
                      <Avatar
                        src={item.sourceImage}
                        sx={{ width: 54, height: 54 }}
                      />
                      {renderIcon(item.type)}
                    </AvatarWrapper>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        <strong>{item.sourceName}</strong> {item.content}
                      </Typography>
                    }
                    secondary={
                      <DynamicTag isRead={item.isRead}>
                        {item.createdAt}
                      </DynamicTag>
                    }
                  />
                  {!item.isRead && (
                    <div
                      style={{
                        backgroundColor: "#6ec924",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        marginLeft: "auto",
                        position: "absolute",
                        right: "20px",
                        top: "50%",
                      }}
                    ></div>
                  )}
                </StyledListItem>
              </StyledLink>
            ))}
          </List>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <List>
            {noti
              .filter((item) => !item.isRead)
              .map((item, index) => (
                <StyledLink key={index} to={item.url}>
                  <StyledListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarWrapper>
                        <Avatar
                          src={item.sourceImage}
                          sx={{ width: 54, height: 54 }}
                        />
                        {renderIcon(item.type)}
                      </AvatarWrapper>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          <strong>{item.sourceName}</strong> {item.content}
                        </Typography>
                      }
                      secondary={
                        <DynamicTag isRead={item.isRead}>
                          {item.createdAt}
                        </DynamicTag>
                      }
                    />
                    {!item.isRead && (
                      <div
                        style={{
                          backgroundColor: "#6ec924",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          marginLeft: "auto",
                          position: "absolute",
                          right: "20px",
                          top: "50%",
                        }}
                      ></div>
                    )}
                  </StyledListItem>
                </StyledLink>
              ))}
          </List>
        </TabPanel>
      </Container>
    </TabContext>
  );
};

export default NotificationDialog;
