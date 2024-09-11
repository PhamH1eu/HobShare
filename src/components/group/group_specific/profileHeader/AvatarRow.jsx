import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import useModal from "src/shared/hooks/util/useModal";
import Invite from "./Invite";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import useDialog from "src/shared/hooks/util/useDialog";
import { Close } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  padding: 0 48px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  border: 2px solid white;
`;

const Action = styled.div`
  display: flex;
  gap: 10px;
`;

const InviteButton = styled(Button)`
  && {
    background-color: #6ec924;
    color: white;
    text-transform: none;
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: bold;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const StatusButton = styled(Button)`
  && {
    background-color: #e0dcdc;
    color: black;
    text-transform: none;
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: bold;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  fontWeight: "bold",
  padding: '12px'
});

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
});

const FooterActions = styled(DialogActions)({
  justifyContent: "flex-end",
});

const CustomDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        Bạn có chắc không?
        <StyledIconButton onClick={onClose}>
          <Close />
        </StyledIconButton>
      </StyledDialogTitle>
      <Divider />
      <DialogContent>
        Bạn có chắc chắn muốn rời khỏi Tuyển dụng Flutter tại Việt Nam không?
      </DialogContent>
      <Divider />
      <FooterActions>
        <Button onClick={onClose} color="primary">
          Huỷ
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Rời khỏi nhóm
        </Button>
      </FooterActions>
    </Dialog>
  );
};

const AvatarRow = () => {
  const avatars = [
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
    "/avatars/cat.png", // Add your avatar image URLs here
    "/avatars/user1.png",
  ];

  const {
    open,
    handleOpen: handleOpenModal,
    handleClose: handleCloseModal,
  } = useModal();
  const {
    open: openConfirm,
    handleOpen: handleOpenConfirm,
    handleClose: handleCloseConfirm,
  } = useModal();
  const { anchorEl, isOpen, handleOpen, handleClose } = useDialog();
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
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
      open={isOpen}
      onClose={handleClose}
    >
      <MenuItem onClick={() => {
        handleOpenConfirm();
        handleClose();
      }} sx={{gap: '20px'}}>
        <LogoutIcon />
        Rời nhóm
      </MenuItem>
    </Menu>
  );

  return (
    <Container>
      <AvatarGroup>
        {avatars.map((src, index) => (
          <StyledAvatar key={index} src={src} />
        ))}
      </AvatarGroup>
      <Action>
        <InviteButton onClick={handleOpenModal}>+ Mời</InviteButton>
        <StatusButton onClick={handleOpen} endIcon={<ArrowDropDownIcon />}>
          Đã tham gia
        </StatusButton>
      </Action>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Invite handleClose={handleCloseModal} />
      </Modal>
      {renderMenu}
      <CustomDialog onClose={handleCloseConfirm} open={openConfirm} />
    </Container>
  );
};

export default AvatarRow;
