import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const contacts = [
  {
    name: "Thu Hieu",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "online",
  },
  {
    name: "Nguyễn Đăng Hải",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Tuấn Anh-nichan",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "online",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Trí Nhân",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  // Add more contacts here
];

const groupChats = [
  {
    name: "Anh Bạn Học Không Thân Thiết",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "online",
  },
  {
    name: "K66-CN1B | QH-2021-I/CQ-C-B",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "offline",
  },
  {
    name: "Phòng trọ không hề bất ổn",
    avatar: "https://i1.sndcdn.com/artworks-000480656619-zm6td3-t500x500.jpg",
    status: "online",
  },
  // Add more group chats here
];

const ContactList = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 64px);
  margin-left: 10px;
  margin-top: 5px
  width: 350px;
  padding-right: 10px;
  overflow-y: auto;

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

  &:hover {
    background-color: rgba(228, 230, 233, 255);
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ContactName = styled.span`
  flex-grow: 1;
  font-size: 15px;
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
  return (
    <ContactList>
      <SearchBar>
        <h2>Người liên hệ</h2>
        <IconButton style={{ width: "40px", height: "40px" }}>
          <SearchIcon color="greyIcon" />
        </IconButton>
      </SearchBar>
      {contacts.map((contact, index) => (
        <ContactItem key={index}>
          <Avatar src={contact.avatar} alt={contact.name} />
          <ContactName>{contact.name}</ContactName>
          <Status className={`status ${contact.status}`}></Status>
        </ContactItem>
      ))}
      <h2>Cuộc trò chuyện nhóm</h2>
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
