import styled from "styled-components";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useModal from "src/shared/hooks/util/useModal";
import AddRequestModal from "./AddRequestModal";

const AddFriend = styled.button`
  position: absolute;
  right: 20px;
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

const AddButton = ({ receiverId }) => {
  const { open, handleClose, handleOpen } = useModal();

  return (
    <>
      <AddFriend onClick={handleOpen}>
        <PersonAddIcon />
        Thêm bạn bè
      </AddFriend>
      <AddRequestModal
        open={open}
        handleClose={handleClose}
        receiverId={receiverId}
      />
    </>
  );
};

export default AddButton;
