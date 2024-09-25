import styled from "styled-components";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import useCancelFriendRequestMutation from "src/shared/hooks/mutation/friend/useCancelFriendRequestMutation";
import CircularLoading from "src/shared/components/Loading";

const Cancel = styled.button`
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

const CancelButton = ({ receiverId }) => {
  const mutation = useCancelFriendRequestMutation();
  const cancel = () => {
    if (mutation.isLoading) return;
    mutation.mutate({ receiverId });
  };

  return (
    <Cancel onClick={cancel}>
      {mutation.isLoading ? (
        <LoadingWrapper>
          <CircularLoading />
        </LoadingWrapper>
      ) : (
        <>
          <PersonAddDisabledIcon />
          Huỷ yêu cầu
        </>
      )}
    </Cancel>
  );
};

export default CancelButton;
