import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import styled from "styled-components";
import Divider from "@mui/material/Divider";

const ChatInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: not-allowed;
`;

const MessageInput = styled.div`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: not-allowed;

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
    cursor: not-allowed;
    width: 100%;
    background-color: rgba(240, 242, 245, 255);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: not-allowed;
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
  cursor: not-allowed;

  span {
    text-align: start;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(101, 103, 107, 255);
    margin-left: 10px;
  }
`;

const NewPostInput = () => {
  return (
    <ChatInput>
      <MessageInput>
        <img
          src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
          alt="User Avatar"
        />
        <input
          type="text"
          disabled={true}
          placeholder={`Bạn đang nghĩ gì thế?`}
        />
      </MessageInput>
      <Divider flexItem variant="middle" color="#bdbdbd" />
      <Actions>
        <IconButton>
          <AddPhotoAlternateIcon color="success" />
          <span>Ảnh/video</span>
        </IconButton>
        <IconButton>
          <AddReactionIcon color="warning" />
          <span>Cảm xúc/hoạt động</span>
        </IconButton>
      </Actions>
    </ChatInput>
  );
};

export default NewPostInput;
