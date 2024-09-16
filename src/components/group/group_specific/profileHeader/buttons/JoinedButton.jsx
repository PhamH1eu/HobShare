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
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "src/store/userStore";
import { GroupService, UserService } from "src/services/SubDatabaseService";
import useGroupInfo from "src/shared/hooks/fetch/group/useGroupInfo";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import useMembersCount from "src/shared/hooks/fetch/group/useMemberCount";
import NewAdminModal from "../component/AssignAdmin";

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
  const [loading, setLoading] = useState(false);
  const { groupId } = useParams();
  const { group } = useGroupInfo(groupId);
  const { currentUserId } = useUserStore();
  const navigate = useNavigate();
  const handleDelete = async () => {
    setLoading(true);
    await Promise.all([
      UserService.removeSubCollection(
        `${currentUserId}/admingroups/${groupId}`
      ),
      GroupService.removeSubCollection(`${groupId}`),
      GroupService.removeCollection(`${groupId}/pendingRequests`),
      GroupService.removeCollection(`${groupId}/posts`),
    ]);
    setLoading(false);
    onClose();
    navigate("/group");
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
      <DialogContent sx={{ textAlign: "center" }}>
        Do bạn là thành viên cuối cùng của {group.name} nên nhóm sẽ bị xoá
      </DialogContent>
      <DialogContent sx={{ textAlign: "center" }}>
        Điều này sẽ xoá toàn bộ bài viết và dữ liệu khác của nhóm.
      </DialogContent>
      <Divider />
      <FooterActions>
        <Button onClick={onClose} color="primary">
          Huỷ
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleDelete}
          color="primary"
          variant="contained"
        >
          Xoá nhóm
        </LoadingButton>
      </FooterActions>
    </Dialog>
  );
};

const LeaveDialog = ({ open, onClose }) => {
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
  const { groupId } = useParams();
  const { membersCount } = useMembersCount(groupId);
  const { isAdmin } = useGroupInfo(groupId);
  const {
    open: openConfirm,
    handleOpen: handleOpenConfirm,
    handleClose: handleCloseConfirm,
  } = useModal();
  const {
    open: openAssignNewAdmin,
    handleOpen: handleOpenAssignNewAdmin,
    handleClose: handleCloseAssignNewAdmin,
  } = useModal();
  const {
    open: openDelete,
    handleOpen: handleOpenDelete,
    handleClose: handleCloseDelete,
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
          if (isAdmin) {
            if (membersCount === 1) {
              // if (true) {
              handleOpenDelete();
            } else {
              handleOpenAssignNewAdmin();
            }
          } else {
            handleOpenConfirm();
          }
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
      <StatusButton onClick={handleOpen} endIcon={<ArrowDropDownIcon />}>
        Đã tham gia
      </StatusButton>
      {renderMenu}
      <LeaveDialog onClose={handleCloseConfirm} open={openConfirm} />
      <NewAdminModal
        open={openAssignNewAdmin}
        onClose={handleCloseAssignNewAdmin}
      />
      <DeleteModal open={openDelete} onClose={handleCloseDelete} />
    </>
  );
};

export default JoinedButton;
