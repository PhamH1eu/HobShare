import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
} from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

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

const noti = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    content: "Nik Nguyễn đã chấp nhận lời mời kết bạn của bạn.",
    time: "2 ngày",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40",
    content: "Nguyễn Đăng Hải đã bình luận về bài viết của Thụ Nhân.",
    time: "2 ngày",
  },
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    content: "Nik Nguyễn đã chấp nhận lời mời kết bạn của bạn.",
    time: "2 ngày",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40",
    content: "Nguyễn Đăng Hải đã bình luận về bài viết của Thụ Nhân.",
    time: "2 ngày",
  },
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    content: "Nik Nguyễn đã chấp nhận lời mời kết bạn của bạn.",
    time: "2 ngày",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40",
    content: "Nguyễn Đăng Hải đã bình luận về bài viết của Thụ Nhân.",
    time: "2 ngày",
  },
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    content: "Nik Nguyễn đã chấp nhận lời mời kết bạn của bạn.",
    time: "2 ngày",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40",
    content: "Nguyễn Đăng Hải đã bình luận về bài viết của Thụ Nhân.",
    time: "2 ngày",
  },
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    content: "Nik Nguyễn đã chấp nhận lời mời kết bạn của bạn.",
    time: "2 ngày",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40",
    content: "Nguyễn Đăng Hải đã bình luận về bài viết của Thụ Nhân.",
    time: "2 ngày",
  },
];

const no = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    content: "Nik Nguyễn đã chấp nhận lời mời kết bạn của bạn.",
    time: "2 ngày",
  },
];

const NotificationDialog = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Container>
        <NotificationHeader>Thông báo</NotificationHeader>
        <TabList onChange={handleChange}>
          <CustomTab label="Tất cả" value="1" />
          <CustomTab label="Chưa đọc" value="2" />
        </TabList>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <List>
            {noti.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <strong>Nigga Nguyễn</strong> đã chấp nhận lời mời kết bạn
                      của bạn.
                    </Typography>
                  }
                  secondary="2 ngày"
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel value="2">
          <List>
            {no.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <strong>Nigga Nguyễn</strong> đã chấp nhận lời mời kết bạn
                      của bạn.
                    </Typography>
                  }
                  secondary="2 ngày"
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Container>
    </TabContext>
  );
};

export default NotificationDialog;
