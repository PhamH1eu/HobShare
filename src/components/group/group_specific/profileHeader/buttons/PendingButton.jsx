import { HighlightOff } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import useDialog from "src/shared/hooks/util/useDialog";
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
          handleClose();
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
