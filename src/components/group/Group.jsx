import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useUserStore } from "src/store/userStore";
import useUserGroup from "src/shared/hooks/fetch/user/useUserGroups";
import CircularLoading from "src/shared/components/Loading";
import useMembersCount from "src/shared/hooks/fetch/group/useMemberCount";
import StyledLink from "src/shared/components/StyledLink";

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

const MainContent = styled(Box)(() => ({
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

const Members = ({ groupId }) => {
  const { membersCount, isLoading } = useMembersCount(groupId);
  if (isLoading) return <CircularLoading />;
  return (
    <Typography variant="caption" color="textSecondary">
      {membersCount} thành viên
    </Typography>
  );
};

const GroupWithSidebar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { currentUserId } = useUserStore();
  const { admins, joined, isLoading } = useUserGroup(currentUserId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) return <CircularLoading />;

  return (
    <Box
      sx={{
        backgroundColor: "#f0f2f5",
        marginTop: "64px",
        overflowX: "hidden",
        width: "100%",
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
        <CustomButton
          onClick={() => navigate("/group/create")}
          variant="contained"
        >
          + Tạo nhóm mới
        </CustomButton>
        <Divider sx={{ marginY: 2 }} />
        {admins.length > 0 && (
          <Typography
            sx={{ fontWeight: "600", fontSize: "1.2rem" }}
            variant="subtitle1"
          >
            Nhóm do bạn quản lý
          </Typography>
        )}
        {admins.map((group, index) => (
          <StyledLink to={`/group/${group.groupId}`} key={index}>
            <GroupContainer>
              <Avatar
                variant="rounded"
                sx={{ width: 48, height: 48 }}
                src={group.wallpaper}
              />
              <GroupDetails>
                <Typography sx={{ fontWeight: "600" }} variant="body2">
                  {group.name}
                </Typography>
                <Members groupId={group.groupId} />
              </GroupDetails>
            </GroupContainer>
          </StyledLink>
        ))}
        <Divider sx={{ marginY: 1 }} />
        {joined.length > 0 && (
          <Typography
            sx={{ fontWeight: "600", fontSize: "1.2rem" }}
            variant="subtitle1"
          >
            Nhóm bạn đã tham gia
          </Typography>
        )}
        {joined.map((group, index) => (
          <StyledLink to={`/group/${group.groupId}`} key={index}>
            <GroupContainer>
              <Avatar
                variant="rounded"
                sx={{ width: 48, height: 48 }}
                src={group.wallpaper}
              />
              <GroupDetails>
                <Typography sx={{ fontWeight: "600" }} variant="body2">
                  {group.name}
                </Typography>
                <Members groupId={group.groupId} />
              </GroupDetails>
            </GroupContainer>
          </StyledLink>
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
