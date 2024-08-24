// @ts-ignore
import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Add, Delete } from "@mui/icons-material";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import useModal from "src/shared/hooks/util/useModal";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

import { useParams } from "react-router-dom";
import { UserService } from "src/services/DatabaseService";
import { useQueryClient } from "react-query";

import AddHobbyModal from "./AddHobbyModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  font-family: Arial, sans-serif;
  margin-bottom: 32px;
`;

// Styled components
const HobbiesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HobbiesGrid = styled(Grid)`
  margin-top: 20px;
`;

const AddHobbyButton = styled(Button)`
  background-color: #6ec924;
  color: white;
  &:hover {
    background-color: #53961d;
  }
`;

const SaveButton = styled(LoadingButton)`
  margin-left: auto;
  margin-top: 20px;
  background-color: #6ec924;
  color: white;
  &:hover {
    background-color: #53961d;
  }
`;

const HobbyCaption = styled.span`
  display: table;
  position: absolute;
  bottom: 20px;
  left: 0;
  background-color: ${(props) =>
    // @ts-ignore
    props.isGoingToDelete ? "red" : "white"};
  color: ${(props) =>
    // @ts-ignore
    props.isGoingToDelete ? "white" : "black"};
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0 8px 8px 0px;
  width: auto;
`;

// Main Component
const HobbiesPage = () => {
  const queryClient = useQueryClient();
  const { open, handleOpen, handleClose } = useModal();

  const { currentUserId } = useUserStore();
  const { userId } = useParams();
  const { data: currentUser } = useUserInfo(userId);
  const isViewingOwnProfile = userId === currentUserId;

  const [deletedAt, setDeletedAt] = useState([]);
  const checkIsGoingToDelete = (index) => {
    return deletedAt.includes(index);
  };
  const toggleImageSelection = (index) => {
    if (deletedAt.includes(index)) {
      setDeletedAt(deletedAt.filter((item) => item !== index));
    } else {
      setDeletedAt([...deletedAt, index]);
    }
  };

  const [loading, setLoading] = useState(false);
  const saveHobbies = async () => {
    setLoading(true);
    const newHobbies = currentUser.favorite.filter(
      (_, index) => !deletedAt.includes(index)
    );
    await UserService.update(currentUserId, { favorite: newHobbies });
    queryClient.invalidateQueries(["user", currentUserId]);
    setDeletedAt([]);
    setLoading(false);
  };

  return (
    <Container>
      <HobbiesHeader>
        <Typography variant="h5">
          {isViewingOwnProfile
            ? "Sở thích của bạn"
            : `Sở thích của ${currentUser.username}`}
        </Typography>
        {isViewingOwnProfile && (
          // <AddHobbyButton
          //   // @ts-ignore
          //   startIcon={<Add color="white" />}
          //   onClick={handleOpen}
          // >
          //   Thêm Sở Thích
          // </AddHobbyButton>
          <input type="text" />
        )}
      </HobbiesHeader>

      <HobbiesGrid container spacing={2}>
        {currentUser.favorite.map((hobby, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="250"
                image={hobby.image}
                alt={hobby.caption}
              />
              <HobbyCaption
                // @ts-ignore
                isGoingToDelete={checkIsGoingToDelete(index)}
              >
                {hobby.caption}
                {isViewingOwnProfile && (
                  <IconButton
                    size="small"
                    onClick={() => toggleImageSelection(index)}
                  >
                    <Delete
                      // @ts-ignore
                      color={checkIsGoingToDelete(index) ? "white" : "black"}
                    />
                  </IconButton>
                )}
              </HobbyCaption>
            </Card>
          </Grid>
        ))}
      </HobbiesGrid>

      <AddHobbyModal open={open} handleClose={handleClose} />
      {isViewingOwnProfile && (
        <SaveButton loading={loading} onClick={saveHobbies}>
          Lưu
        </SaveButton>
      )}
    </Container>
  );
};

export default HobbiesPage;
