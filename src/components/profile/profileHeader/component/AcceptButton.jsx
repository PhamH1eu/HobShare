import styled from "styled-components";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useAcceptRequestMutation from "src/shared/hooks/mutation/friend/useAcceptRequestMutation";

const Accept = styled.button`
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

const AcceptButton = ({ receiverId }) => {
  const mutation = useAcceptRequestMutation();
  const accept = () => {
    mutation.mutate({ fromUserId: receiverId });
  };

  return (
    <Accept onClick={accept}>
      <PersonAddIcon />
      Chấp nhận
    </Accept>
  );
};

export default AcceptButton;
