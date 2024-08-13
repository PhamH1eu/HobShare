import { useState } from 'react';
import styled from 'styled-components';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  IconButton 
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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

const AddNewCollectionModal = ({ open, handleClose, handleAdd }) => {
  const [collectionName, setCollectionName] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleNameChange = (event) => {
    setCollectionName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    handleAdd({ name: collectionName, avatar });
    setCollectionName('');
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
            <Avatar src={avatar} alt="Collection Avatar" />
            <input 
              accept="image/*" 
              style={{ display: 'none' }} 
              id="icon-button-file" 
              type="file" 
              onChange={handleAvatarChange} 
            />
            <label htmlFor="icon-button-file" style={{display: 'flex', alignItems: 'center'}}>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
              <Typography variant="h6">Chọn ảnh đại diện</Typography>
            </label>
          </AvatarContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!collectionName} // Disable the button if the name is empty
            fullWidth
          >
            Lưu lại
          </Button>
        </FormContainer>
      </ModalContainer>
    </Modal>
  );
};

export default AddNewCollectionModal;
