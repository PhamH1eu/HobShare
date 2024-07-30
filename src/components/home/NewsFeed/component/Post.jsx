import styled from "styled-components";
import { useState } from "react";
import {
  IoMdThumbsUp,
  IoIosShareAlt,
  IoIosChatbubbles,
  IoMdHappy,
} from "react-icons/io";
import Divider from "@mui/material/Divider";

const PostWrapper = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
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
  font-size: 14px;
  font-weight: 500;
`;

const PostContent = styled.div``;

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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  gap: 4px;
  font-size: 1.05rem;
  font-weight: 500;

  &:hover {
    background-color: rgba(228, 230, 233, 255);
  }
`;

const Post = ({ post }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

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
              color: like ? "rgba(5,97,242,255)" : "rgba(91, 98, 106, 255)",
            }}
            onClick={handleLike}
          >
            <IoMdThumbsUp /> Thích
          </PostAction>
          <PostAction>
            <IoIosChatbubbles style={{ color: "rgba(91, 98, 106, 255)" }} />{" "}
            Bình luận
          </PostAction>
          <PostAction>
            <IoIosShareAlt style={{ color: "rgba(91, 98, 106, 255)" }} /> Chia
            sẻ
          </PostAction>
        </PostActions>
      </PostFooter>
    </PostWrapper>
  );
};

export default Post;
