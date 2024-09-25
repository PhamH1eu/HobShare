import styled from "styled-components";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import useDenyFriendRequestMutation from "src/shared/hooks/mutation/friend/useDenyFriendRequestMutation";
import CircularLoading from "src/shared/components/Loading";

const Deny = styled.button`
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

const DenyButton = ({ senderId }) => {
  const mutation = useDenyFriendRequestMutation();
  const deny = () => {
    if (mutation.isLoading) return;
    mutation.mutate({ senderId: senderId });
  };
  return (
    <Deny onClick={deny}>
      {mutation.isLoading ? (
        <LoadingWrapper>
          <CircularLoading />
        </LoadingWrapper>
      ) : (
        <>
          <PersonAddDisabledIcon />
          Từ chối
        </>
      )}
    </Deny>
  );
};

export default DenyButton;
