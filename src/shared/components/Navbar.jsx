import * as React from "react";
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

import { auth } from "src/lib/firebase";
import useDialog from "src/hooks/useDialog";
import { useChatStore } from "src/store/chatStore";
import { useUserStore } from "src/store/userStore";

import NotificationDialog from "./navbar_dialog/NotificationDialog";
import MessengerDialog from "./navbar_dialog/MessengerDialog";

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

const NavBar = () => {
  const { currentUser } = useUserStore();
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
      <NotificationDialog />
    </Menu>
  );

  const renderMessenger = (
    <Menu
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
      open={isMessengerOpen}
      onClose={handleMessengerClose}
    >
      <MessengerDialog handleClose={handleMessengerClose}/>
    </Menu>
  );

  const resetChat = useChatStore((state) => state.resetChat);
  const navigate = useNavigate();
  const logout = async () => {
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon
                // @ts-ignore
                color="greyIcon"
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "16px" }}>
            {!checkMess && <IconButton
              size="large"
              aria-label="show 4 new mails"
              style={{ backgroundColor: "rgba(228,230,235,255)" }}
              onClick={handleMessengerOpen}
            >
              <Badge badgeContent={""} color="error">
                <SmsIcon
                  // @ts-ignore
                  color="black"
                />
              </Badge>
            </IconButton>}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{ backgroundColor: "rgba(228,230,235,255)" }}
              onClick={handleNotiOpen}
            >
              <Badge badgeContent={17} color="error">
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
