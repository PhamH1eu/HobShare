import React from "react";
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

import useModal from "src/hooks/useModal";
import SaveToCollectionModal from "./modal/SaveItemToCollection";

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

const SavedItem = ({ title, type, avatarUrl, userName, postUrl }) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <ItemCard>
      <Avatar
        src={avatarUrl}
        alt={userName}
        sx={{ marginRight: "20px", height: "140px", width: "140px" }}
        variant="rounded"
      />
      <ItemContent>
        <StyledLink to="/">
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {title}
          </Typography>
        </StyledLink>
        <Typography variant="body2" color="text.secondary">
          {type} • Đã lưu từ {postUrl}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bài viết của {userName}
        </Typography>
      </ItemContent>
      <CardActions>
        <Button variant="contained" onClick={handleOpen}>
          Thêm vào bộ sưu tập
        </Button>
        <Button variant="outlined" startIcon={<BookmarkRemoveIcon />}>
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

const savedItems = [
  {
    title: "Video của Gurshan Brar",
    type: "Thước phim",
    avatarUrl: "/path-to-avatar-1.jpg",
    userName: "Gurshan Brar",
    postUrl: "bài viết của Gurshan Brar",
  },
  {
    title: "Hàng về @mọi người",
    type: "Bài viết",
    avatarUrl: "/path-to-avatar-2.jpg",
    userName: "Võ Ánh",
    postUrl: "bài viết của Võ Ánh",
  },
  {
    title: "Chào ae cộng đồng Node.js Việt Nam",
    type: "Bài viết",
    avatarUrl: "/path-to-avatar-3.jpg",
    userName: "Nguyễn Thế Huy",
    postUrl: "bài viết của Nguyễn Thế Huy",
  },
  {
    title: "Video của Gurshan Brar",
    type: "Thước phim",
    avatarUrl: "/path-to-avatar-1.jpg",
    userName: "Gurshan Brar",
    postUrl: "bài viết của Gurshan Brar",
  },
  {
    title: "Hàng về @mọi người",
    type: "Bài viết",
    avatarUrl: "/path-to-avatar-2.jpg",
    userName: "Võ Ánh",
    postUrl: "bài viết của Võ Ánh",
  },
  {
    title: "Chào ae cộng đồng Node.js Việt Nam",
    type: "Bài viết",
    avatarUrl: "/path-to-avatar-3.jpg",
    userName: "Nguyễn Thế Huy",
    postUrl: "bài viết của Nguyễn Thế Huy",
  },
];

const SavedItemList = ({ currentCollection }) => {
  // fetch saved items based on the current collection
  return (
    <Box sx={{ marginTop: "20px" }}>
      {savedItems.map((item, index) => (
        <SavedItem
          key={index}
          title={item.title}
          type={item.type}
          avatarUrl={item.avatarUrl}
          userName={item.userName}
          postUrl={item.postUrl}
        />
      ))}
    </Box>
  );
};

export default SavedItemList;
