import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useUserStore } from "src/store/userStore";

const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "330px",
});

const StyledTextField = styled(TextField)({
  margin: "20px 0 10px 0", // Adjust margin to make space for the warning text
  width: "100%",
  maxWidth: "400px",
});

const WarningText = styled(Typography)({
  color: "red",
  fontSize: "12px",
  marginTop: "-8px", // Moves the warning text closer to the input
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  width: "200px",
});

const MAX_CHAR_COUNT = 100;

const AddRequestModal = ({ open, handleClose }) => {
  const { currentUser } = useUserStore();
  const [description, setDescription] = useState(
    `Xin chào, mình là ${currentUser.username} đây, kết bạn với mình nhé!`
  );
  const [charCount, setCharCount] = useState(description.length);

  const handleDescriptionChange = (event) => {
    const input = event.target.value;
    if (input.length <= MAX_CHAR_COUNT) {
      setDescription(input);
      setCharCount(input.length);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <CenteredBox>
          <Avatar
            alt="User Avatar"
            src="user-avatar-url.jpg"
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            Hiếu Phạm
          </Typography>
          <StyledTextField
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
            multiline
            helperText={`${charCount}/${MAX_CHAR_COUNT} kí tự`}
          />
          {charCount === MAX_CHAR_COUNT && (
            <WarningText>Đã đạt giới hạn số lượng kí tự tối đa</WarningText>
          )}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Gửi yêu cầu
          </StyledButton>
        </CenteredBox>
      </DialogContent>
    </Dialog>
  );
};

export default AddRequestModal;
