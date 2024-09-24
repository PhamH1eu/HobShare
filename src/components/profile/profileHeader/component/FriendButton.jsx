import styled from "styled-components";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Menu, MenuItem } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";

import useDialog from "src/shared/hooks/util/useDialog";
import useRemoveFriendMutation from "src/shared/hooks/mutation/friend/useRemoveFriendMutation";

const Friend = styled.button`
  position: absolute;
  right: 140px;
  bottom: 40px;
  background-color: #e8e4ec;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const FriendButton = ({ friendId }) => {
  const { anchorEl, isOpen, handleOpen, handleClose } = useDialog();
  const mutation = useRemoveFriendMutation();

  const removeFriend = () => {
    mutation.mutate({ friendId });
    handleClose();
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
      onClose={removeFriend}
    >
      <MenuItem sx={{ gap: "20px" }}>
        <PersonOffIcon />
        Huỷ kết bạn
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Friend onClick={handleOpen}>
        <PeopleAltIcon />
        Bạn bè
      </Friend>
      {renderMenu}
    </>
  );
};

export default FriendButton;
