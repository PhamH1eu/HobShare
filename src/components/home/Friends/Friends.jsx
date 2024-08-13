import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";

import useChatList from "src/hooks/useChatList";
import { useChatDialogStore } from "src/store/chatDialogStore";

const StyledBadge = muiStyled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "10px",
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const AvatarWrapper = styled(Box)(() => ({
  position: "relative",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover .close-button": {
    display: "flex",
  },
}));

const groupChats = [
  {
    name: "Anh Bạn Học Không Thân Thiết",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    online: true,
  },
  {
    name: "K66-CN1B | QH-2021-I/CQ-C-B",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    online: false,
  },
  {
    name: "Phòng trọ không hề bất ổn",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    online: true,
  },
  // Add more group chats here
];

const ContactList = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 64px);
  margin-top: 5px;
  padding-right: 10px;
  padding-left: 10px;
  overflow-y: auto;
  background-color: white;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }

  &:hover {
    &::-webkit-scrollbar {
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  }

  h2 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(101, 103, 107, 255);
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 10px;

  input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }

  h2 {
    color: rgba(101, 103, 107, 255);
  }

  button {
    background-color: transparent;
    margin-left: auto;
    margin-top: 10px;
    border-radius: 50%;
  }
`;

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

const Status = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 10px;

  &.online {
    background-color: green;
  }

  &.offline {
    background-color: red;
  }
`;
const Friends = () => {
  const { chats } = useChatList();

  const addChat = useChatDialogStore((state) => state.addChat);

  return (
    <ContactList>
      <SearchBar>
        <h2>Người liên hệ</h2>
        <IconButton style={{ width: "40px", height: "40px" }}>
          <SearchIcon
            // @ts-ignore
            color="greyIcon"
          />
        </IconButton>
      </SearchBar>
      {chats.map((contact, index) => (
        <ContactItem key={index} onClick={() => addChat(contact)}>
          <AvatarWrapper>
            <StyledBadge
              key={index}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={contact.user.avatar}
                alt={contact.user.username}
                sx={{ width: 50, height: 50 }}
              />
            </StyledBadge>
          </AvatarWrapper>
          <ContactName>{contact.user.username}</ContactName>
        </ContactItem>
      ))}
      {groupChats.length > 0 && <h2>Cuộc trò chuyện nhóm</h2>}
      {groupChats.map((chat, index) => (
        <ContactItem key={index}>
          <Avatar src={chat.avatar} alt={chat.name} />
          <ContactName className="contact-name">{chat.name}</ContactName>
          <Status className={`status ${chat.status}`}></Status>
        </ContactItem>
      ))}
    </ContactList>
  );
};

export default Friends;
