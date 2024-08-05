import styled from "styled-components";
import { useState } from "react";
import {
  IoMdThumbsUp,
  IoIosShareAlt,
  IoIosChatbubbles,
  IoMdHappy,
} from "react-icons/io";
import { IconButton } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Divider from "@mui/material/Divider";
import { useUserStore } from "src/store/userStore";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

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

const MessageInput = styled.div`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 10px;
  width: 100%;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }

  input {
    border-radius: 20px;
    height: 40px;
    padding-left: 15px;
    margin-right: 40px;
    border: none;
    outline: none;
    font-size: 1rem;
    width: 100%;
    background-color: rgba(240, 242, 245, 255);

    &:hover {
      background-color: rgba(228, 230, 233, 255);
    }
  }
`;

const PostComment = styled.div``;

const Post = ({ post }) => {
  const { currentUser } = useUserStore();
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  const [marked, setMarked] = useState(false);
  const handleMarked = () => {
    setMarked(!marked);
  };

  const [showComment, setShowComment] = useState(false);
  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];

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
            <BookmarksIcon color={marked ? "blue" : "greyIcon"} />
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
              color: like ? "rgba(5,97,242,255)" : "rgba(91, 98, 106, 255)",
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
          <PostAction style={{ color: "rgba(91, 98, 106, 255)" }}>
            <IoIosShareAlt />
            Chia sẻ
          </PostAction>
        </PostActions>
      </PostFooter>
      <Divider flexItem variant="middle" color="#bdbdbd" />
      {showComment && (
        // <PostComment>
          <CommentSection
            currentUser={{
              currentUserId: "01a",
              currentUserImg: currentUser.avatar,
              currentUserProfile:
                "https://www.linkedin.com/in/riya-negi-8879631a9/",
              currentUserFullName: currentUser.username,
            }}
            commentData={data}
            onSubmitAction={(data) => console.log("check submit, ", data)}
            currentData={(data) => {
              console.log("curent data", data);
            }}
          />
        //   <MessageInput>
        //     <img src={currentUser.avatar} alt="User Avatar" />
        //     <input type="text" placeholder="Viết câu trả lời" />
        //   </MessageInput>
        // </PostComment>
      )}
    </PostWrapper>
  );
};

export default Post;
