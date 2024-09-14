import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { Link } from "react-router-dom";
import CircularLoading from "src/shared/components/Loading";

import useModal from "src/shared/hooks/util/useModal";
import SaveToCollectionModal from "./modal/SaveItemToCollection";

import { useUserStore } from "src/store/userStore";
import useSavedPosts from "src/shared/hooks/fetch/saved/useSavedPost";
import truncateString from "src/shared/helper/truncateString";
import { SavedService } from "src/services/SubDatabaseService";
import { useQueryClient } from "react-query";

const ItemCard = styled(Card)`
  margin-bottom: 20px;
  display: flex;
  padding: 16px;
  width: 100%;
`;

const ItemContent = styled(CardContent)`
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const VideoWrapper = styled(Box)`
  position: relative;
  width: 140px;
  height: 140px;
  margin-right: 20px;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const SavedItem = ({ post, type, currentCollection }) => {
  const queryClient = useQueryClient();
  const { open, handleOpen, handleClose } = useModal();
  const { currentUserId } = useUserStore();

  const removeSavedItem = async () => {
    await SavedService.removeSubCollection(
      `${currentUserId}/${currentCollection}/${post.id}`
    );
    queryClient.invalidateQueries([currentCollection, currentUserId]);
  };

  return (
    <ItemCard>
      {post.video ? (
        <VideoWrapper>
          <video>
            <source src={post.video} type="video/mp4" />
          </video>
        </VideoWrapper>
      ) : (
        <Avatar
          src={post.image ? post.image : post.authorAvatar}
          alt={post.authorName}
          sx={{ marginRight: "20px", height: "140px", width: "140px" }}
          variant="rounded"
        />
      )}
      <ItemContent>
        <StyledLink to={`/post/${post.id}`}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {truncateString(post.text, 40)}
          </Typography>
        </StyledLink>
        <Typography variant="body2" color="text.secondary">
          {type} • {post.authorName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Đã lưu từ bài viết của {post.authorName}
        </Typography>
      </ItemContent>
      <CardActions>
        <Button variant="contained" onClick={handleOpen}>
          Thêm vào bộ sưu tập
        </Button>
        <Button
          onClick={removeSavedItem}
          variant="outlined"
          startIcon={<BookmarkRemoveIcon />}
        >
          Bỏ lưu
        </Button>
      </CardActions>

      <SaveToCollectionModal
        open={open}
        handleClose={handleClose}
        post={post}
      />
    </ItemCard>
  );
};

const SavedItemList = ({ currentCollection }) => {
  const validateCollection = currentCollection ? currentCollection : "saved";
  const { currentUserId } = useUserStore();
  const { posts, isLoading } = useSavedPosts(currentUserId, validateCollection);

  if (isLoading) {
    return (
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          padding: "16px",
          width: "65vw",
        }}
      >
        <CircularLoading />
      </Box>
    );
  }

  // fetch saved items based on the current collection
  return (
    <Box sx={{ marginTop: "20px" }}>
      {posts.map((item, index) => (
        <SavedItem
          key={index}
          post={item}
          type="Bài viết"
          currentCollection={validateCollection}
        />
      ))}
    </Box>
  );
};

export default SavedItemList;
