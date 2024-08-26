import { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { SavedService } from "src/services/SubDatabaseService";
import upload from "src/shared/helper/upload";
import { useUserStore } from "src/store/userStore";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 24;
  outline: none;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddNewCollectionModal = ({ open, handleClose }) => {
  const { currentUserId } = useUserStore();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleNameChange = (event) => {
    setCollectionName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) =>
        setAvatar({
          file: event.target.files[0],
          url: e.target.result,
        });
    }
  };

  const handleSave = async () => {
    if (collectionName === "" || avatar === null) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    const res = await upload(avatar.file);
    await SavedService.addDataToArray(`${currentUserId}`, "collections", {
      name: collectionName,
      avatar: res,
    });
    queryClient.invalidateQueries("collections");
    setLoading(false);
    setCollectionName("");
    setAvatar(null);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <Typography variant="h6" gutterBottom>
          Tạo bộ sưu tập mới
        </Typography>
        <FormContainer>
          <TextField
            label="Tên bộ sưu tập"
            variant="outlined"
            fullWidth
            value={collectionName}
            onChange={handleNameChange}
          />
          <AvatarContainer>
            <Avatar src={avatar?.url} alt="Collection Avatar" />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="icon-button-file"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              <Typography variant="h6">Chọn ảnh đại diện</Typography>
            </label>
          </AvatarContainer>
          <LoadingButton
            variant="contained"
            loading={loading}
            color="primary"
            onClick={handleSave}
            disabled={!collectionName} // Disable the button if the name is empty
            fullWidth
          >
            Lưu lại
          </LoadingButton>
        </FormContainer>
      </ModalContainer>
    </Modal>
  );
};

export default AddNewCollectionModal;
