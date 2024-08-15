import styled from "styled-components";
import { Box } from "@mui/material";
import { useChatDialogStore } from "src/store/chatDialogStore";
import Avatar from "src/shared/components/Avatar";

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  gap: 10px;

  &:hover {
    background-color: rgba(228, 230, 233, 255);
  }
`;

const ContactName = styled.span`
  flex-grow: 1;
  font-size: 14px;
  color: #050505;
  font-weight: 500;
`;

const AvatarWrapper = styled(Box)(() => ({
  position: "relative",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover .close-button": {
    display: "flex",
  },
}));

const Contact = ({ contact }) => {
  const addChat = useChatDialogStore((state) => state.addChat);

  return (
    <ContactItem onClick={() => addChat(contact)}>
      <AvatarWrapper>
        <Avatar src={contact.user.avatar} receiverId={contact.receiverId} />
      </AvatarWrapper>
      <ContactName>{contact.user.username}</ContactName>
    </ContactItem>
  );
};

export default Contact;
