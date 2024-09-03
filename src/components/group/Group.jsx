import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { Settings, Home, Explore, Group } from "@mui/icons-material";

import GroupNewsFeed from "./component/GroupNewsFeed";
import GroupRecommend from "./component/GroupRecommend";

const Sidebar = styled(Box)(({ theme }) => ({
  width: "250px",
  backgroundColor: "white",
  padding: theme.spacing(2),
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
}));

const GroupContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 0),
}));

const GroupDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const groups = [
  {
    avatar: "https://path-to-image-1.jpg",
    name: "PhD.Hub",
  },
  {
    avatar: "https://path-to-image-1.jpg",
    name: "PhD.Hub",
  },
  {
    avatar: "https://path-to-image-1.jpg",
    name: "PhD.Hub",
  },
  {
    avatar: "https://path-to-image-1.jpg",
    name: "PhD.Hub",
  },
];

const GroupWithSidebar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        marginTop: "64px",
      }}
    >
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Nhóm
        </Typography>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Facebook-like tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<Home />} label="Bảng feed của bạn" {...a11yProps(0)} />
          <Tab icon={<Explore />} label="Khám phá" {...a11yProps(1)} />
        </Tabs>
        <CustomButton variant="contained">+ Tạo nhóm mới</CustomButton>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="subtitle1">Nhóm do bạn quản lý</Typography>
        <GroupContainer>
          <Avatar src="https://path-to-image.jpg" />
          <GroupDetails>
            <Typography variant="body2">123</Typography>
            <Typography variant="caption" color="textSecondary">
              Lần hoạt động gần nhất: 12 giờ trước
            </Typography>
          </GroupDetails>
        </GroupContainer>
        <Typography variant="subtitle1">Nhóm bạn đã tham gia</Typography>
        {groups.map((group, index) => (
          <GroupContainer key={index}>
            <Avatar src={group.avatar} />
            <GroupDetails>
              <Typography variant="body2">{group.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                123 thành viên
              </Typography>
            </GroupDetails>
          </GroupContainer>
        ))}
      </Sidebar>

      <MainContent>
        <TabPanel value={value} index={0}>
          <GroupNewsFeed />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GroupRecommend />
        </TabPanel>
      </MainContent>
    </Box>
  );
};

export default GroupWithSidebar;
