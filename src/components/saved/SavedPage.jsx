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
import useCollections from "src/shared/hooks/fetch/useCollections";
import CircularLoading from "src/shared/components/Loading";
import { SavedService } from "src/services/SubDatabaseService";
import { useUserStore } from "src/store/userStore";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";

const SidebarContainer = styled.div`
  width: 25vw;
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
  margin-left: 40px;
  width: 68vw;
`;

const StyledTextItem = styled(ListItemText)`
  font-weight: 600 !important;
`;

const Layout = styled(Box)`
  display: flex;
  margin-top: 64px;
  width: 100vw;
  max-height: 100vh;
  overflow-y: auto;
`;

const SavedPage = () => {
  const queryClient = useQueryClient();
  const { open, handleOpen, handleClose } = useModal();
  const { currentUserId } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const handleSelectCollection = (collection) => {
    setCurrentCollection(collection);
  };

  const handleClearCollection = async () => {
    setLoading(true);
    await Promise.all([
      SavedService.removeCollection(
        `${currentUserId}/${currentCollection.name}`
      ),
      SavedService.removeDataFromArray(
        `${currentUserId}`,
        "collections",
        currentCollection
      ),
    ]);
    queryClient.invalidateQueries("collections");
    setLoading(false);
    setCurrentCollection(null);
  };

  const { collections, isLoading } = useCollections();

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
          <StyledTextItem
            primary="Mục đã lưu"
            onClick={() => handleSelectCollection("saved")}
          />
        </ListItemButton>
        <Divider />
        <Header variant="h6">Bộ sưu tập của tôi</Header>

        <List>
          {isLoading ? (
            <CircularLoading />
          ) : (
            collections.map((item, index) => (
              <React.Fragment key={index}>
                <ListItemButton onClick={() => handleSelectCollection(item)}>
                  <ListItemAvatar>
                    <Avatar src={item.avatar} variant="rounded" />
                  </ListItemAvatar>
                  <StyledTextItem primary={item.name} />
                </ListItemButton>
              </React.Fragment>
            ))
          )}
        </List>

        <StyledButton variant="outlined" onClick={handleOpen}>
          + Tạo bộ sưu tập mới
        </StyledButton>
      </SidebarContainer>
      <Content>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: "600" }} variant="h5">
            {currentCollection?.name || "Mục đã lưu"}
          </Typography>
          {currentCollection && (
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleClearCollection}
              startIcon={
                <LayersClearIcon
                  // @ts-ignore
                  color="white"
                />
              }
            >
              Xoá{" "}
            </LoadingButton>
          )}
        </Box>
        <SavedItemList currentCollection={currentCollection?.name} />
      </Content>
      <AddNewCollectionModal open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default SavedPage;
