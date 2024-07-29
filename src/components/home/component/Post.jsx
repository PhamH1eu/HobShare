import React from "react";
import styled from "styled-components";
import {
  IoMdThumbsUp,
  IoIosShareAlt,
  IoIosChatbubbles,
  IoMdHappy,
} from "react-icons/io";
import Divider from "@mui/material/Divider";

const PostWrapper = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
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
`;

const PostContent = styled.div`
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
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
  margin: 5px;
`;

const PostAction = styled.button`
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  gap: 4px;
  font-size: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Post = ({ post }) => {
  return (
    <PostWrapper>
      <PostHeader>
        <ProfilePic src={post.authorAvatar} />
        <PostInfo>
          <PostAuthor>{post.authorName}</PostAuthor>
          <PostTime>{post.time}</PostTime>
        </PostInfo>
      </PostHeader>
      <PostContent>
        <p style={{ padding: "10px" }}>{post.postContent}</p>
        {post.postImage && <PostImage src={post.postImage} />}
        {post.postVideo && (
          <video controls>
            <source src={post.postVideo} type="video/mp4" />
          </video>
        )}
      </PostContent>
      <PostFooter>
        <PostReactions>
          <IoMdThumbsUp color="cornflowerblue" />
          <IoMdHappy color="yellow" />
          {post.reactions}
        </PostReactions>
        <Divider flexItem variant="middle" color="#bdbdbd" />
        <PostActions>
          <PostAction>
            <IoMdThumbsUp /> Thích
          </PostAction>
          <PostAction>
            <IoIosChatbubbles /> Bình luận
          </PostAction>
          <PostAction>
            <IoIosShareAlt /> Chia sẻ
          </PostAction>
        </PostActions>
      </PostFooter>
    </PostWrapper>
  );
};

export default Post;
