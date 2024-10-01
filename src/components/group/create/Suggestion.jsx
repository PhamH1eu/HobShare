import { useState } from "react";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Chip,
  InputBase,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useChatList from "src/shared/hooks/listen/useChatList";

const StyledChip = styled(Chip)(() => ({
  backgroundColor: "#dff5cc", // Light green background
  color: "#6ec924", // Green text color
  height: "36px",
  padding: "8px",
  "& .MuiChip-label": {
    fontWeight: "bold",
  },
  "& .MuiAvatar-root": {
    width: "28px",
    height: "28px",
    marginRight: "8px",
  },
}));

// Styled suggestion list container
const SuggestionBox = styled(Box)({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  maxHeight: "200px",
  overflowY: "auto",
  zIndex: 1000,
});

const SuggestionItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

const AvatarWrapper = styled(Avatar)({
  marginRight: "10px",
});

const CustomInputWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  minHeight: "50px",
  position: "relative",
  width: "100%",
  "&:focus-within": {
    borderColor: "#6ec924", // Add Facebook blue when focused
  },
});

const InputBaseStyled = styled(InputBase)({
  width: "100%", // Make the input stretch across the width
  marginTop: "4px",
  marginBottom: "4px",
  paddingLeft: "8px",
});

const SelectedUsersBox = styled(Box)({
  display: "flex",
  flexDirection: "column", // Stack chips vertically
  alignItems: "flex-start", // Align items to the start
  gap: "5px",
  width: "100%",
});

const FriendSuggestions = ({ selectedUsers, setSelectedUsers }) => {
  const { chats } = useChatList();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const handleSelectUser = (user) => {
    if (!selectedUsers.some((u) => u.receiverId === user.receiverId)) {
      setSelectedUsers([...selectedUsers, user]);
      setInputValue("");
    }
  };
  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user.receiverId !== userToRemove.receiverId)
    );
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleClickAway = () => {
    setShowSuggestions(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative" width="100%" marginTop="12px">
        {/* Custom Input with Selected Users */}
        <CustomInputWrapper>
          {selectedUsers.length > 0 || inputValue ? (
            <Typography
              variant="caption"
              sx={{ color: "#6ec924", marginBottom: "4px" }}
            >
              Mời bạn bè
            </Typography>
          ) : null}
          <SelectedUsersBox>
            {selectedUsers.map((user, index) => (
              <StyledChip
                key={index}
                avatar={
                  <Avatar alt={user.receiverName} src={user.receiverAvatar} />
                }
                label={user.receiverName}
                onDelete={() => handleRemoveUser(user)}
                size="medium"
              />
            ))}
            <InputBaseStyled
              placeholder={selectedUsers.length === 0 ? "Nhập tên bạn bè" : ""}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleFocus}
            />
          </SelectedUsersBox>
        </CustomInputWrapper>

        {/* Suggestions Box - positioned directly under the input */}
        {showSuggestions && (
          <SuggestionBox>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ padding: "10px" }}
            >
              Gợi ý
            </Typography>
            {chats
              .filter((suggestion) =>
                suggestion.receiverName
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
              )
              .map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  onClick={() => handleSelectUser(suggestion)}
                >
                  <AvatarWrapper src={suggestion.receiverAvatar} />
                  <Box>
                    <Typography variant="body1">
                      {suggestion.receiverName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      6 bạn chung
                    </Typography>
                  </Box>
                </SuggestionItem>
              ))}
          </SuggestionBox>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default FriendSuggestions;
