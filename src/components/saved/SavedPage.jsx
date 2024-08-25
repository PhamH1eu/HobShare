import SavedItemList from "./SavedItem";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Avatar,
  Typography,
  Button,
  List,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
  ListItemButton,
} from "@mui/material";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import AllInboxIcon from "@mui/icons-material/AllInbox";

import useModal from "src/shared/hooks/util/useModal";
import AddNewCollectionModal from "./modal/AddNewCollection";

const SidebarContainer = styled.div`
  width: 30vw;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
`;

const Header = styled(Typography)`
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
  border-radius: 8px;
  font-weight: 600;
  background-color: #ebf5ff;
`;

const Content = styled(Box)`
  padding: 20px;
`;

const StyledTextItem = styled(ListItemText)`
  font-weight: 600 !important;
`;

const items = [
  { icon: "https://mui.com/static/images/avatar/2.jpg", label: "Code" },
  { icon: "https://mui.com/static/images/avatar/3.jpg", label: "Giáo dục" },
  {
    icon: "https://mui.com/static/images/avatar/4.jpg",
    label: "TV & Phim ảnh",
  },
  { icon: "https://mui.com/static/images/avatar/5.jpg", label: "Âm nhạc" },
  { icon: "https://mui.com/static/images/avatar/6.jpg", label: "Để xem sau" },
  { icon: "https://mui.com/static/images/avatar/7.jpg", label: "Ẩm thực" },
];

const Layout = styled(Box)`
  display: flex;
  margin-top: 64px;
  width: 100vw;
  max-height: 100vh;
  overflow-y: auto;
`;

const SavedPage = () => {
  const { open, handleOpen, handleClose } = useModal();
  const [collections, setCollections] = useState(items);
  const handleAddCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  const [currentCollection, setCurrentCollection] = useState(null);
  const handleSelectCollection = (collection) => {
    setCurrentCollection(collection);
  };

  return (
    <Layout>
      <SidebarContainer>
        <Header variant="h5">Đã lưu</Header>
        <ListItemButton onClick={() => handleSelectCollection(null)}>
          <ListItemAvatar>
            <div
              style={{
                backgroundColor: "#6ec924",
                width: "fit-content",
                color: "white",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              <AllInboxIcon />
            </div>
          </ListItemAvatar>
          <StyledTextItem primary="Mục đã lưu" />
        </ListItemButton>
        <Divider />
        <Header variant="h6">Bộ sưu tập của tôi</Header>

        <List>
          {collections.map((item, index) => (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleSelectCollection(item)}>
                <ListItemAvatar>
                  <Avatar src={item.icon} variant="rounded" />
                </ListItemAvatar>
                <StyledTextItem primary={item.label} />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>

        <StyledButton variant="outlined" onClick={handleOpen}>
          + Tạo bộ sưu tập mới
        </StyledButton>
      </SidebarContainer>
      <Content>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: "600" }} variant="h5">
            {currentCollection?.label || "Mục đã lưu"}
          </Typography>
          {currentCollection && (
            <Button
              variant="contained"
              startIcon={
                <LayersClearIcon
                  // @ts-ignore
                  color="white"
                />
              }
            >
              Xoá{" "}
            </Button>
          )}
        </Box>
        <SavedItemList currentCollection={currentCollection} />
      </Content>
      <AddNewCollectionModal
        open={open}
        handleClose={handleClose}
        handleAdd={handleAddCollection}
      />
    </Layout>
  );
};

export default SavedPage;
