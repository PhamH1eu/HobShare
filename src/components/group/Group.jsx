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
import { Home, Explore } from "@mui/icons-material";

import GroupNewsFeed from "./component/GroupNewsFeed";
import GroupRecommend from "./component/GroupRecommend";

const Sidebar = styled(Box)(({ theme }) => ({
  width: "340px",
  height: "calc(100vh - 64px)",
  overflowY: "auto",
  backgroundColor: "white",
  padding: theme.spacing(2),
  position: "fixed",
  left: 0,

  "&::-webkit-scrollbar": {
    background: "transparent",
    width: "10px",
    height: "10px",
  },

  "&:hover": {
    "&::-webkit-scrollbar": {
      background: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ccc",
      borderRadius: "10px",
    },
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: "340px",
  padding: "0 16px",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
}));

const GroupContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1),

  "&:hover": {
    backgroundColor: "#f0f2f5",
    borderRadius: "4px",
    cursor: "pointer",
  },
}));

const GroupDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const TabsContainer = styled(Tab)(({ theme }) => ({
  padding: 0,
  paddingLeft: theme.spacing(1),
  borderRadius: "4px 0 0 4px",
  minHeight: "50px",
  justifyContent: "flex-start",
  textTransform: "none",
  fontWeight: "600",
  fontSize: "1rem",
  gap: theme.spacing(1),
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
        backgroundColor: "#f0f2f5",
        marginTop: "64px",
        overflowX: "hidden",
      }}
    >
      <Sidebar>
        <Typography
          style={{ fontWeight: "600", fontSize: "1.5rem" }}
          variant="h6"
          gutterBottom
        >
          Nhóm
        </Typography>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <TabsContainer
            icon={<Home />}
            iconPosition="start"
            label="Bảng feed của bạn"
            {...a11yProps(0)}
          />
          <TabsContainer
            icon={<Explore />}
            iconPosition="start"
            label="Khám phá"
            {...a11yProps(1)}
          />
        </Tabs>
        <CustomButton variant="contained">+ Tạo nhóm mới</CustomButton>
        <Divider sx={{ marginY: 2 }} />
        <Typography
          sx={{ fontWeight: "600", fontSize: "1.2rem" }}
          variant="subtitle1"
        >
          Nhóm do bạn quản lý
        </Typography>
        <GroupContainer>
          <Avatar
            variant="rounded"
            sx={{ width: 48, height: 48 }}
            src="https://path-to-image.jpg"
          />
          <GroupDetails>
            <Typography sx={{ fontWeight: "600" }} variant="body2">
              123
            </Typography>
            <Typography variant="caption" color="textSecondary">
              123 thành viên
            </Typography>
          </GroupDetails>
        </GroupContainer>
        <Divider sx={{ marginY: 1 }} />
        <Typography
          sx={{ fontWeight: "600", fontSize: "1.2rem" }}
          variant="subtitle1"
        >
          Nhóm bạn đã tham gia
        </Typography>
        {groups.map((group, index) => (
          <GroupContainer key={index}>
            <Avatar
              variant="rounded"
              sx={{ width: 48, height: 48 }}
              src={group.avatar}
            />
            <GroupDetails>
              <Typography sx={{ fontWeight: "600" }} variant="body2">
                {group.name}
              </Typography>
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
