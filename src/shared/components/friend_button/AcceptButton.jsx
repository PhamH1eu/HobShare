import styled from "styled-components";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useAcceptRequestMutation from "src/shared/hooks/mutation/friend/useAcceptRequestMutation";
import CircularLoading from "src/shared/components/Loading";

const Accept = styled.button`
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

const AcceptButton = ({ receiverId }) => {
  const mutation = useAcceptRequestMutation();
  const accept = () => {
    if (mutation.isLoading) return;
    mutation.mutate({ fromUserId: receiverId });
  };

  return (
    <Accept onClick={accept}>
      {mutation.isLoading ? (
        <LoadingWrapper>
          <CircularLoading />
        </LoadingWrapper>
      ) : (
        <>
          <PersonAddIcon />
          Chấp nhận
        </>
      )}
    </Accept>
  );
};

export default AcceptButton;
