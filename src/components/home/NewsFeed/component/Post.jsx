import styled from "styled-components";
import { useState } from "react";
import {
  IoMdThumbsUp,
  IoIosShareAlt,
  IoIosChatbubbles,
  IoMdHappy,
} from "react-icons/io";

import Comments from "./Comments";

import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Divider from "@mui/material/Divider";
import Share from "./Share";
import useModal from "src/hooks/useModal";
import React from "react";

const PostWrapper = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  margin: 25px 0;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 10px 0 15px;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostAuthor = styled.span`
  font-weight: bold;
`;

const PostTime = styled.span`
  color: #999;
  font-size: 14px;
  font-weight: 500;
`;

const PostContent = styled.div``;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostReactions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 10px 10px;
  font-size: 1rem;
`;

const PostActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

const PostAction = styled.button`
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 5px;
  margin: 3px;
  gap: 4px;
  font-size: 1.05rem;
  font-weight: 500;

  &:hover {
    background-color: rgba(228, 230, 233, 255);
  }
`;

const Marked = styled.div`
  margin-left: auto;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const LoadComments = styled.div`
  cursor: pointer;
  color: rgba(91, 98, 106, 255);
  font-size: 14px;
  font-weight: 500;
  padding: 10px;
  padding-bottom: 0;

  &:hover {
    text-decoration: underline;
    color: rgba(5, 97, 242, 255);
  }
`;

const Post = ({ post }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  const [marked, setMarked] = useState(false);
  const handleMarked = () => {
    setMarked(!marked);
  };

  const [showComment, setShowComment] = useState(false);
  const { open, handleOpen, handleClose } = useModal();

  return (
    <PostWrapper>
      <PostHeader>
        <ProfilePic src={post.authorAvatar} />
        <PostInfo>
          <PostAuthor>{post.authorName}</PostAuthor>
          <PostTime>{post.time}</PostTime>
        </PostInfo>
        <Marked>
          <IconButton onClick={handleMarked}>
            <BookmarksIcon color={marked ? "primary" : "greyIcon"} />
          </IconButton>
        </Marked>
      </PostHeader>
      <PostContent>
        <p style={{ padding: "10px", marginLeft: "5px" }}>{post.postContent}</p>
        {post.postImage && <PostImage src={post.postImage} />}
        {post.postVideo && (
          <video controls style={{ width: "100%" }}>
            <source src={post.postVideo} type="video/mp4" />
          </video>
        )}
      </PostContent>
      <PostFooter>
        <PostReactions>
          <IoMdThumbsUp
            style={{ fontSize: "1.25rem" }}
            color="cornflowerblue"
          />
          <IoMdHappy style={{ fontSize: "1.25rem" }} color="#F5C33B" />
          {post.reactions}
        </PostReactions>
        <Divider flexItem variant="middle" color="#bdbdbd" />
        <PostActions>
          <PostAction
            style={{
              color: like ? "#6ec924" : "rgba(91, 98, 106, 255)",
            }}
            onClick={handleLike}
          >
            <IoMdThumbsUp /> Thích
          </PostAction>
          <PostAction
            onClick={() => setShowComment(true)}
            style={{ color: "rgba(91, 98, 106, 255)" }}
          >
            <IoIosChatbubbles />
            Bình luận
          </PostAction>
          <PostAction
            onClick={handleOpen}
            style={{ color: "rgba(91, 98, 106, 255)" }}
          >
            <IoIosShareAlt />
            Chia sẻ
          </PostAction>
        </PostActions>
      </PostFooter>
      <Divider flexItem variant="middle" color="#bdbdbd" />
      {showComment && (
        <>
          <LoadComments onClick={() => console.log("load them di")}>
            Xem thêm bình luận
          </LoadComments>
          <Comments />
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Share post={post} handleClose={handleClose}/>
      </Modal>
    </PostWrapper>
  );
};

export default Post;
