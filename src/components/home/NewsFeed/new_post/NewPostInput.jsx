import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import styled from "styled-components";
import { useUserStore } from "src/store/userStore";
import Divider from "@mui/material/Divider";

import useModal from "src/shared/hooks/util/useModal";
import NewModal from "./NewModal";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

const ChatInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const MessageInput = styled.div`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 10px;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }

  input {
    border-radius: 20px;
    height: 40px;
    padding-left: 15px;
    border: none;
    outline: none;
    font-size: 1rem;
    width: 100%;
    background-color: rgba(240, 242, 245, 255);
    cursor: pointer;

    &:hover {
      background-color: rgba(228, 230, 233, 255);
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const IconButton = styled.button`
  width: 200px;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: rgba(240, 242, 245, 255);
  }

  span {
    text-align: start;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(101, 103, 107, 255);
    margin-left: 10px;
  }
`;

const NewPostInput = ({groupId, groupName}) => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const { open, handleOpen, handleClose } = useModal();

  return (
    <ChatInput>
      <MessageInput>
        <img src={currentUser.avatar} alt="User Avatar" />
        <input
          type="text"
          readOnly
          placeholder={`${currentUser.username} ơi, bạn đang nghĩ gì thế?`}
          onClick={handleOpen}
        />
      </MessageInput>
      <Divider flexItem variant="middle" color="#bdbdbd" />
      <Actions>
        <IconButton onClick={handleOpen}>
          <AddPhotoAlternateIcon color="success" />
          <span>Ảnh/video</span>
        </IconButton>
        <IconButton onClick={handleOpen}>
          <AddReactionIcon color="warning" />
          <span>Cảm xúc/hoạt động</span>
        </IconButton>
      </Actions>
      <NewModal open={open} onClose={handleClose} groupId={groupId} groupName={groupName} />
    </ChatInput>
  );
};

export default NewPostInput;
