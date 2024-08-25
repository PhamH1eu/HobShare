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
import useSavedPosts from "src/shared/hooks/fetch/useSavedPost";
import truncateString from "src/shared/helper/truncateString";
import { SavedService } from "src/services/SubDatabaseService";
import { useQueryClient } from "react-query";

const ItemCard = styled(Card)`
  margin-bottom: 20px;
  display: flex;
  padding: 16px;
  width: 65vw;
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

const SavedItem = ({ title, type, id, avatarUrl, userName, video }) => {
  const queryClient = useQueryClient();
  const { open, handleOpen, handleClose } = useModal();
  const { currentUserId } = useUserStore();

  const removeSavedItem = async () => {
    await SavedService.removeSubCollection(`${currentUserId}/savedPosts/${id}`);
    queryClient.invalidateQueries(["saved", currentUserId]);
  };

  return (
    <ItemCard>
      {video ? (
        <VideoWrapper>
          <video>
            <source src={video} type="video/mp4" />
          </video>
        </VideoWrapper>
      ) : (
        <Avatar
          src={avatarUrl}
          alt={userName}
          sx={{ marginRight: "20px", height: "140px", width: "140px" }}
          variant="rounded"
        />
      )}
      <ItemContent>
        <StyledLink to={`/post/${id}`}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {title}
          </Typography>
        </StyledLink>
        <Typography variant="body2" color="text.secondary">
          {type} • {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Đã lưu từ bài viết của {userName}
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
        collections={items}
      />
    </ItemCard>
  );
};

const SavedItemList = ({ currentCollection }) => {
  const { currentUserId } = useUserStore();
  const { posts, isLoading } = useSavedPosts(currentUserId);

  if (isLoading) {
    return (
      <Box sx={{ marginTop: "20px" }}>
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
          title={truncateString(item.text, 40)}
          type="Bài viết"
          id={item.id}
          avatarUrl={item.image ? item.image : item.authorAvatar}
          userName={item.authorName}
          video={item.video}
        />
      ))}
    </Box>
  );
};

export default SavedItemList;
