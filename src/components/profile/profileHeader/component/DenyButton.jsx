import styled from "styled-components";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import useDenyFriendRequestMutation from "src/shared/hooks/mutation/friend/useDenyFriendRequestMutation";

const Deny = styled.button`
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

const DenyButton = ({ senderId }) => {
  const mutation = useDenyFriendRequestMutation();
  const deny = () => {
    mutation.mutate({ senderId: senderId });
  };
  return (
    <Deny onClick={deny}>
      <PersonAddDisabledIcon />
      Từ chối
    </Deny>
  );
};

export default DenyButton;
