import { Button, Modal, styled } from "@mui/material";
import useModal from "src/shared/hooks/util/useModal";
import Invite from "../Invite";

const InviteButton = styled(Button)`
  && {
    background-color: #6ec924;
    color: white;
    text-transform: none;
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: bold;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const InviteButtonPlus = () => {
  const {
    open,
    handleOpen: handleOpenModal,
    handleClose: handleCloseModal,
  } = useModal();
  return (
    <>
      <InviteButton onClick={handleOpenModal}>+ Mời</InviteButton>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Invite handleClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default InviteButtonPlus;