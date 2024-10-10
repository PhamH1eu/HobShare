import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { ActivitiesService, UserService } from "src/services/DatabaseService";
import { useUserStore } from "src/store/userStore";
import { useQueryClient } from "react-query";
import uploadLabeledImage from "src/shared/helper/uploadLabeledImage";

const AddHobbyModal = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { currentUserId } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const [image, setImage] = useState(null);
  const handleImg = (e) => {
    const file = {
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    };
    //check if file is image or video
    setImage(file);
    e.target.value = null;
  };
  const saveActivity = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Hãy chọn 1 ảnh trước khi lưu");
      return;
    }
    if (caption === "") {
      alert("Hãy nhập tên hoạt động trước khi lưu");
      return;
    }
    setLoading(true);
    const newHobby = {
      caption: caption,
    };
    const resID = await ActivitiesService.create(newHobby);
    const res = await uploadLabeledImage(image.file, resID.id, "activities");
    await ActivitiesService.update(resID.id, { image: res });
    await UserService.union(currentUserId, "favorite", [
      { ...newHobby, image: res, id: resID.id },
    ]);
    queryClient.invalidateQueries(["user", currentUserId]);
    setCaption("");
    setImage(null);
    setLoading(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm Sở Thích Mới</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Caption"
          type="text"
          fullWidth
          variant="outlined"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          style={{ marginTop: 16 }}
        >
          Chọn Ảnh
          <input
            type="file"
            accept="image/*"
            onChange={handleImg}
            required={true}
            style={{ display: "none" }}
          />
        </Button>
        {image && (
          <img
            src={image.url}
            alt="preview"
            style={{ width: "100%", marginTop: 16 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={saveActivity}
        >
          Lưu
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddHobbyModal;
