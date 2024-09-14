import { Close, Logout, MoreVert } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import useDialog from "src/shared/hooks/util/useDialog";
import useModal from "src/shared/hooks/util/useModal";
import styled from "styled-components";

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

const DeleteButton = ({ isAdmin }) => {
  const {
    open: openDeleteModal,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();
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
        <Logout />
        Xoá nhóm
      </MenuItem>
    </Menu>
  );

  return (
    isAdmin && (
      <>
        <StatusButton onClick={handleOpenDelete}>
          <MoreVert />
        </StatusButton>
        {renderDeleteMenu}
        <DeleteModal open={openDeleteModal} onClose={handleCloseDeleteModal} />
      </>
    )
  );
};

export default DeleteButton;
