import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SmsIcon from "@mui/icons-material/Sms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";

import { ref, set, serverTimestamp } from "firebase/database";
import { auth, database } from "src/lib/firebase";
import useDialog from "src/shared/hooks/util/useDialog";
import { useChatStore } from "src/store/chatStore";
import { useUserStore } from "src/store/userStore";

import NotificationDialog from "./navbar_dialog/NotificationDialog";
import MessengerDialog from "./navbar_dialog/MessengerDialog";
import { useState } from "react";
import useUserInfo from "../hooks/fetch/user/useUserInfo";
import useChatList from "../hooks/listen/useChatList";
import useListenNotifications from "../hooks/listen/useListenNotifications";
import { useQueryClient } from "react-query";
import { SearchBox } from "react-instantsearch";
import CustomSearchBox from "src/components/search/component/CustomSearchBox";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "rgba(240,242,245,255)",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    borderRadius: "10px",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
  },
  "& .MuiList-root": {
    padding: 0,
  },
}));

const NavBar = () => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  let location = useLocation();
  let checkMess = Boolean(location.pathname === "/messenger");

  const {
    anchorEl: menuAnchorEl,
    isOpen: isMenuOpen,
    handleOpen: handleMenuOpen,
    handleClose: handleMenuClose,
  } = useDialog();

  const {
    anchorEl: notiAnchorEl,
    isOpen: isNotiOpen,
    handleOpen: handleNotiOpen,
    handleClose: handleNotiClose,
  } = useDialog();

  const {
    anchorEl: messengerAnchorEl,
    isOpen: isMessengerOpen,
    handleOpen: handleMessengerOpen,
    handleClose: handleMessengerClose,
  } = useDialog();
  const [unreadNotis, setUnreadNotis] = useState(0);
  const [loadingNoti, setLoadingNoti] = useState(false);
  useListenNotifications(currentUserId, setUnreadNotis);

  const renderNoti = (
    <Menu
      anchorEl={notiAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotiOpen}
      onClose={handleNotiClose}
    >
      <NotificationDialog
        handleNotiClose={handleNotiClose}
        setLoadingNoti={setLoadingNoti}
        unreadNotis={unreadNotis}
      />
    </Menu>
  );

  const renderMessenger = (
    <StyledMenu
      anchorEl={messengerAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ paddingBottom: "0px" }}
      open={isMessengerOpen}
      onClose={handleMessengerClose}
    >
      <MessengerDialog handleClose={handleMessengerClose} />
    </StyledMenu>
  );

  const queryClient = useQueryClient();
  const resetChat = useChatStore((state) => state.resetChat);
  const setUserId = useUserStore((state) => state.setUserId);
  const navigate = useNavigate();
  const logout = async () => {
    set(ref(database, "/status/" + currentUser.id), {
      state: "offline",
      last_changed: serverTimestamp(),
    });
    setUserId(null);
    queryClient.clear();
    await auth.signOut();
    resetChat();
    navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/profile/${currentUser.id}`);
        }}
      >
        {currentUser.username}
      </MenuItem>
      <MenuItem onClick={logout}>Đăng xuất</MenuItem>
    </Menu>
  );

  const [inputValue, setInputValue] = useState("");
  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const { chats } = useChatList();
  const unreadChats = chats.filter((chat) => !chat.isSeen).length;

  return (
    <Box>
      <AppBar
        position="fixed"
        // @ts-ignore
        color="white"
        style={{
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar>
          <Link to="/">
            <Avatar
              style={{ width: "48px", height: "48px" }}
              src="https://cdn-icons-png.freepik.com/256/2853/2853408.png?semt=ais_hybrid"
            />
          </Link>
          <CustomSearchBox />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "16px" }}>
            {!checkMess && (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                style={{ backgroundColor: "rgba(228,230,235,255)" }}
                onClick={handleMessengerOpen}
              >
                <Badge
                  invisible={unreadChats === 0}
                  badgeContent={unreadChats}
                  color="error"
                >
                  <SmsIcon
                    // @ts-ignore
                    color="black"
                  />
                </Badge>
              </IconButton>
            )}
            <IconButton
              size="large"
              style={{ backgroundColor: "rgba(228,230,235,255)" }}
              onClick={handleNotiOpen}
            >
              <Badge
                badgeContent={loadingNoti ? "..." : unreadNotis}
                color="error"
              >
                <NotificationsIcon
                  // @ts-ignore
                  color="black"
                />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              style={{ padding: 0, margin: 0 }}
            >
              <Avatar
                style={{ width: "48px", height: "48px" }}
                src={currentUser.avatar}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNoti}
      {renderMessenger}
    </Box>
  );
};

export default NavBar;
