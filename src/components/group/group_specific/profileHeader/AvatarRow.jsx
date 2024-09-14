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
import { Close, MoreVert } from "@mui/icons-material";
import useMembers from "src/shared/hooks/fetch/group/useMembers";
import { useParams } from "react-router-dom";
import CircularLoading from "src/shared/components/Loading";

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
  padding: "12px",
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

const DeleteModal = ({ open, onClose }) => {
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
        Bạn có chắc chắn muốn xoá Tuyển dụng Flutter tại Việt Nam không?
      </DialogContent>
      <DialogContent>
        Điều này sẽ xoá toàn bộ bài viết, thành viên và dữ liệu khác của nhóm.
      </DialogContent>
      <Divider />
      <FooterActions>
        <Button onClick={onClose} color="primary">
          Huỷ
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Xoá nhóm
        </Button>
      </FooterActions>
    </Dialog>
  );
};

const AvatarRow = ({ isAdmin }) => {
  const { groupId } = useParams();
  const { members, isLoading } = useMembers(groupId);

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
  const {
    open: openDeleteModal,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();

  const { anchorEl, isOpen, handleOpen, handleClose } = useDialog();
  const handleOpenLeave = () => {
    if (isAdmin) return;
    handleOpen();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={handleClose}
    >
      <MenuItem
        onClick={() => {
          handleOpenConfirm();
          handleClose();
        }}
        sx={{ gap: "20px" }}
      >
        <LogoutIcon />
        Rời nhóm
      </MenuItem>
    </Menu>
  );

  const {
    anchorEl: deleteEl,
    isOpen: isOpenDelete,
    handleOpen: handleOpenDelete,
    handleClose: handleCloseDelete,
  } = useDialog();
  const renderDeleteMenu = (
    <Menu
      anchorEl={deleteEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpenDelete}
      onClose={handleCloseDelete}
    >
      <MenuItem
        onClick={() => {
          handleCloseDelete();
          handleOpenDeleteModal();
        }}
        sx={{ gap: "20px" }}
      >
        <LogoutIcon />
        Xoá nhóm
      </MenuItem>
    </Menu>
  );

  if (isLoading) return <CircularLoading />;

  return (
    <Container>
      <AvatarGroup>
        {members.slice(0, 10).map((user, index) => (
          <StyledAvatar key={index} src={user.avatar} />
        ))}
      </AvatarGroup>
      <Action>
        <InviteButton onClick={handleOpenModal}>+ Mời</InviteButton>
        <StatusButton onClick={handleOpenLeave} endIcon={<ArrowDropDownIcon />}>
          Đã tham gia
        </StatusButton>
        <StatusButton onClick={handleOpenDelete}>
          <MoreVert />
        </StatusButton>
      </Action>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Invite handleClose={handleCloseModal}/>
      </Modal>
      {renderMenu}
      {renderDeleteMenu}
      <CustomDialog onClose={handleCloseConfirm} open={openConfirm} />
      {isAdmin && (
        <DeleteModal open={openDeleteModal} onClose={handleCloseDeleteModal} />
      )}
    </Container>
  );
};

export default AvatarRow;
