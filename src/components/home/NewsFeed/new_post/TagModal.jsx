import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { ArrowBack } from "@mui/icons-material";

import useChatList from "src/hooks/listen/useChatList";
import useFriendStore from "src/store/useFriendStore";

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

const Footer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  padding-top: 8px;
`;

const TagModal = ({ toggleTaggingModal }) => {
  const { chats } = useChatList();

  const { selectedFriends, addFriend, removeFriend } = useFriendStore();

  const handleFriendToggle = (friend) => {
    if (selectedFriends.some((item) => item.id === friend.id)) {
      removeFriend(friend);
    } else {
      addFriend(friend);
    }
  };

  return (
    <ModalContainer>
      <Header>
        <IconButton onClick={toggleTaggingModal}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Gắn thẻ bạn bè</Typography>
      </Header>

      <List sx={{ height: "500px", overflowY: "auto" }}>
        {chats.map((friend) => (
          <ListItem key={friend.user.id}>
            <ListItemAvatar>
              <Avatar alt={friend.user.username} src={friend.user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={friend.user.username} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={selectedFriends.some(
                  (item) => item.id === friend.user.id
                )}
                onChange={() => handleFriendToggle(friend.user)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Footer>
        <Button
          onClick={toggleTaggingModal}
          variant="contained"
          color="primary"
        >
          Thêm
        </Button>
      </Footer>
    </ModalContainer>
  );
};

export default TagModal;
