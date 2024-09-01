import { useState } from "react";
import styled from "styled-components";
import StyledLink from "../StyledLink";
import InfiniteScroll from "react-infinite-scroller";
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

import { useUserStore } from "src/store/userStore";

import { timeDiff } from "src/shared/helper/timeDiff";
import CircularLoading from "../Loading";
import useNotifications from "src/shared/hooks/fetch/useNotifications";
import { NotificationService } from "src/services/SubDatabaseService";
import { useQueryClient } from "react-query";
import { increment } from "firebase/firestore";

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

const NotificationDialog = ({
  handleNotiClose,
  setLoadingNoti,
  unreadNotis,
}) => {
  const { currentUserId } = useUserStore();
  const queryClient = useQueryClient();
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
  const read = async (item) => {
    handleNotiClose();
    handleMenuClose();
    setLoadingNoti(true);

    if (unreadNotis === 0) {
      setLoadingNoti(false);
      return;
    }

    if (item) {
      const updateStatus = NotificationService.updateSubCollection(
        `${currentUserId}/notifications/${item.id}`,
        "isRead",
        true
      );
      const updateCount = await NotificationService.updateSubCollection(
        `${currentUserId}`,
        "unreadNotis",
        increment(-1)
      );
      await Promise.all([updateStatus, updateCount]);
    } else {
      const updatePromise = noti.map((item) => {
        return NotificationService.updateSubCollection(
          `${currentUserId}/notifications/${item.id}`,
          "isRead",
          true
        );
      });
      const updateCount = await NotificationService.updateSubCollection(
        `${currentUserId}`,
        "unreadNotis",
        0
      );
      Promise.all([...updatePromise, updateCount]);
    }

    setLoadingNoti(false);
    queryClient.invalidateQueries("notifications");
  };

  const { notis } = useNotifications();

  if (notis.isLoading) {
    return <CircularLoading />;
  }

  const noti = notis.data.pages
    .map((page) =>
      page.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    )
    .flat();

  const loadMore = () => {
    //time out
    setTimeout(() => {
      notis.fetchNextPage();
    }, 3000);
  };

  const renderListNoti = (noti) => {
    return noti.map((item, index) => (
      <StyledLink key={index} to={item.url} onClick={() => read(item)}>
        <StyledListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarWrapper>
              <Avatar src={item.sourceImage} sx={{ width: 54, height: 54 }} />
              {renderIcon(item.type)}
            </AvatarWrapper>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body2">
                <strong>{item.sourceName}</strong>
                <span
                  style={{
                    color: item.isRead ? "#65676b" : "black",
                    marginLeft: "4px",
                    fontWeight: item.isRead ? "normal" : "600",
                  }}
                >
                  {item.content}
                </span>
              </Typography>
            }
            secondary={
              <DynamicTag isRead={item.isRead}>
                {timeDiff(
                  item.createdAt.seconds * 1000 +
                    item.createdAt.nanoseconds / 1000000
                )}
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
    ));
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
            <MenuItem onClick={() => read()}>
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
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={notis.hasNextPage}
            loader={<CircularLoading key={0} />}
            useWindow={false}
          >
            <List>{renderListNoti(noti)}</List>
          </InfiniteScroll>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={notis.hasNextPage}
            loader={<CircularLoading key={0} />}
            useWindow={false}
          >
            <List>
              {renderListNoti(
                noti.filter(
                  (item) =>
                    !(
                      // @ts-ignore
                      item.isRead
                    )
                )
              )}
            </List>
          </InfiniteScroll>
        </TabPanel>
      </Container>
    </TabContext>
  );
};

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

export default NotificationDialog;
