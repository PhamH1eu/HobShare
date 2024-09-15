import { HighlightOff } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { GroupService } from "src/services/SubDatabaseService";
import useDialog from "src/shared/hooks/util/useDialog";
import { useUserStore } from "src/store/userStore";
import styled from "styled-components";

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

const PendingButton = () => {
  const queryClient = useQueryClient();
  const { groupId } = useParams();
  const { currentUserId } = useUserStore();
  const { anchorEl, isOpen, handleOpen, handleClose } = useDialog();

  const handleCancel = async () => {
    await GroupService.removeSubCollection(`${groupId}/pendingRequests/${currentUserId}`);
    queryClient.invalidateQueries("groupStatus");
  }

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
          handleClose();
          handleCancel();
        }}
        sx={{ gap: "20px" }}
      >
        <HighlightOff />
        Huỷ yêu cầu
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <StatusButton onClick={handleOpen}>Chờ duyệt</StatusButton>
      {renderMenu}
    </>
  );
};

export default PendingButton;
