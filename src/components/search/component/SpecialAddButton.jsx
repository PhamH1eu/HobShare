import styled from "styled-components";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddFriend = styled.button`
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

const SpecialAddButton = ({ handleOpen }) => {
  return (
    <AddFriend onClick={handleOpen}>
      <PersonAddIcon />
      Thêm bạn bè
    </AddFriend>
  );
};

export default SpecialAddButton;
