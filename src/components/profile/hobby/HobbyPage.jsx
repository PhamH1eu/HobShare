import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import useModal from "src/hooks/useModal";
import styled from "styled-components";

import { useUserStore } from "src/store/userStore";
import { useParams } from "react-router-dom";

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

const SaveButton = styled(Button)`
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
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0 8px 8px 0px;
  width: auto;
`;

// Main Component
const HobbiesPage = () => {
  const { currentUser } = useUserStore();
  const { userId } = useParams();
  const isViewingOwnProfile = userId === currentUser.id;

  const [hobbies, setHobbies] = useState([
    { id: 1, image: "/photos/photo01.jpg", caption: "Photography" },
    { id: 2, image: "/photos/photo06.jpg", caption: "Cycling" },
  ]);
  const [newHobby, setNewHobby] = useState({ image: "", caption: "" });

  const { open, handleOpen, handleClose } = useModal();

  const handleAddHobby = () => {
    setHobbies([...hobbies, { id: hobbies.length + 1, ...newHobby }]);
    handleClose();
  };

  const handleDeleteHobby = (image) => {
    setHobbies(hobbies.filter((hobby) => hobby.image !== image));
  };

  return (
    <Container>
      <HobbiesHeader>
        <Typography variant="h5">
          {isViewingOwnProfile ? "Sở thích của bạn" : `Sở thích của nó`}
        </Typography>
        {isViewingOwnProfile && (
          <AddHobbyButton
            // @ts-ignore
            startIcon={<Add color="white" />}
            onClick={handleOpen}
          >
            Thêm Sở Thích
          </AddHobbyButton>
        )}
      </HobbiesHeader>

      <HobbiesGrid container spacing={2}>
        {hobbies.map((hobby) => (
          <Grid item xs={12} sm={6} md={4} key={hobby.id}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="250"
                image={hobby.image}
                alt={hobby.caption}
              />
              <HobbyCaption>
                {hobby.caption}
                {isViewingOwnProfile && (
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteHobby(hobby.image)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </HobbyCaption>
            </Card>
          </Grid>
        ))}
      </HobbiesGrid>

      {/* Add New Hobby Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Sở Thích Mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Caption"
            type="text"
            fullWidth
            variant="outlined"
            value={newHobby.caption}
            onChange={(e) =>
              setNewHobby({ ...newHobby, caption: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newHobby.image}
            onChange={(e) =>
              setNewHobby({ ...newHobby, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAddHobby}>Lưu</Button>
        </DialogActions>
      </Dialog>
      {isViewingOwnProfile && (
        <SaveButton onClick={() => console.log("saved")}>Lưu</SaveButton>
      )}
    </Container>
  );
};

export default HobbiesPage;
