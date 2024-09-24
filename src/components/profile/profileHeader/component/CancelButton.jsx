import styled from "styled-components";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import useCancelFriendRequestMutation from "src/shared/hooks/mutation/friend/useCancelFriendRequestMutation";

const Cancel = styled.button`
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

const CancelButton = ({ receiverId }) => {
  const mutation = useCancelFriendRequestMutation();
  const cancel = () => {
    mutation.mutate({ receiverId });
  };

  return (
    <Cancel onClick={cancel}>
      <PersonAddDisabledIcon />
      Huỷ yêu cầu
    </Cancel>
  );
};

export default CancelButton;
