import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { Box, IconButton } from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import useLikers from "src/shared/hooks/fetch/post/useLikers";
import CircularLoading from "src/shared/components/Loading";
import Close from "@mui/icons-material/Close";
import StyledLink from "src/shared/components/StyledLink";
const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  padding: "12px",
};

// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal Container
const ModalContainer = styled.div`
  padding: 0 10px 10px 10px;
  border-radius: 8px;
`;

// User Item
const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const UserI4 = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  gap: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #e4e6eb;
  }
`;

// User Info
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex-grow: 1;
`;

// Add Friend Button
const AddFriendButton = styled.button`
  background-color: #e0dcdc;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  margin: 6px 0;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #d0d2d6; // Slightly darker on hover
  }
`;

const StyledCloseButton = styled(IconButton)`
  background-color: #e4e6eb; // Light gray background
  color: black; // Icon color
  &:hover {
    background-color: #d0d2d6; // Slightly darker on hover
  }
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CloseButton = ({ onClick }) => {
  return (
    <StyledCloseButton onClick={onClick}>
      <Close />
    </StyledCloseButton>
  );
};

const UsersLike = ({ handleClose, postId }) => {
  const { users, isLoading } = useLikers(postId);

  if (isLoading) {
    return (
      <Box sx={style}>
        <ModalContainer>
          <CircularLoading />
        </ModalContainer>
      </Box>
    );
  }

  return (
    <Box sx={style}>
      <ModalContainer>
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #ced0d4",
            marginBottom: "10px",
            padding: "10px",
            paddingTop: "0",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", marginTop: "6px" }}>Tất cả</h3>
          <CloseButton onClick={handleClose} />
        </Box>
        {users.map((user, index) => (
          <UserItem key={index}>
            <StyledLink to={`/profile/${user.userId}`}>
              <UserI4>
                <Avatar src={user.avatar} alt={user.username} />
                <UserInfo>
                  <span>{user.username}</span>
                </UserInfo>
              </UserI4>
            </StyledLink>
            <AddFriendButton>
              <PersonAdd />
              Thêm bạn bè
            </AddFriendButton>
          </UserItem>
        ))}
      </ModalContainer>
    </Box>
  );
};

export default UsersLike;
