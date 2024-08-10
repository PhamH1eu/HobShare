// SaveToCollectionModal.js
import React from "react";
import styled from "styled-components";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  Button,
  Avatar,
} from "@mui/material";

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

const CollectionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const CollectionLabel = styled.div`
  display: flex;
  align-items: center;
`;

const CollectionText = styled(Typography)`
  margin-left: 8px;
`;

const SaveToCollectionModal = ({ open, handleClose, collections }) => {
  const [selectedCollections, setSelectedCollections] = React.useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedCollections([...selectedCollections, name]);
    } else {
      setSelectedCollections(
        selectedCollections.filter((item) => item !== name)
      );
    }
  };

  const handleSaveClick = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <Typography variant="h6" gutterBottom>
          Chọn bộ sưu tập
        </Typography>
        <FormGroup>
          {collections.map((collection, index) => (
            <CollectionItem key={index}>
              <CollectionLabel>
                <Avatar
                  src={collection.icon}
                  alt={collection.label}
                  variant="rounded"
                />
                <CollectionText variant="body1">
                  {collection.label}
                </CollectionText>
              </CollectionLabel>
              <Checkbox
                name={collection.label}
                onChange={handleCheckboxChange}
              />
            </CollectionItem>
          ))}
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          style={{ marginTop: "16px" }}
          fullWidth
        >
          Lưu lại
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default SaveToCollectionModal;
