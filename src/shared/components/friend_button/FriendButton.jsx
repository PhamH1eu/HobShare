import styled from "styled-components";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Menu, MenuItem } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";

import useDialog from "src/shared/hooks/util/useDialog";
import useRemoveFriendMutation from "src/shared/hooks/mutation/friend/useRemoveFriendMutation";
import CircularLoading from "src/shared/components/Loading";

const Friend = styled.button`
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

const LoadingWrapper = styled.div`
  span {
    width: 24px !important;
    height: 24px !important;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const FriendButton = ({ friendId }) => {
  const { anchorEl, isOpen, handleOpen, handleClose } = useDialog();
  const mutation = useRemoveFriendMutation();

  const removeFriend = async () => {
    if (mutation.isLoading) return;
    await mutation.mutateAsync({ friendId });
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
      onClose={handleClose}
    >
      <MenuItem onClick={removeFriend} sx={{ gap: "20px" }}>
        {mutation.isLoading ? (
          <LoadingWrapper>
            <CircularLoading />
          </LoadingWrapper>
        ) : (
          <>
            <PersonOffIcon />
            Huỷ kết bạn
          </>
        )}
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
