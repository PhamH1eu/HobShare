import { Close, Logout } from "@mui/icons-material";
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
  styled,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useDialog from "src/shared/hooks/util/useDialog";
import useModal from "src/shared/hooks/util/useModal";
import { useParams } from "react-router-dom";
import { useUserStore } from "src/store/userStore";
import { GroupService, UserService } from "src/services/SubDatabaseService";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";

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

const CustomDialog = ({ open, onClose }) => {
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const { currentUserId } = useUserStore();
  const handleLeave = async () => {
    await GroupService.removeSubCollection(
      `${groupId}/members/${currentUserId}`
    );
    await UserService.removeSubCollection(
      `${currentUserId}/joinedgroups/${groupId}`
    );
    window.location.reload();
  };
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
        Bạn có chắc chắn muốn rời khỏi {group.name} không?
      </DialogContent>
      <Divider />
      <FooterActions>
        <Button onClick={onClose} color="primary">
          Huỷ
        </Button>
        <Button onClick={handleLeave} color="primary" variant="contained">
          Rời khỏi nhóm
        </Button>
      </FooterActions>
    </Dialog>
  );
};

const JoinedButton = () => {
  const {
    open: openConfirm,
    handleOpen: handleOpenConfirm,
    handleClose: handleCloseConfirm,
  } = useModal();

  const { anchorEl, isOpen, handleOpen, handleClose } = useDialog();

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
        <Logout />
        Rời nhóm
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <StatusButton
        onClick={handleOpen}
        endIcon={<ArrowDropDownIcon />}
      >
        Đã tham gia
      </StatusButton>
      {renderMenu}
      <CustomDialog onClose={handleCloseConfirm} open={openConfirm} />
    </>
  );
};

export default JoinedButton;
