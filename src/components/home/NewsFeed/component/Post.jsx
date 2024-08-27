import styled from "styled-components";
import { useEffect, useState } from "react";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import Comments from "./Comments";

import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CircularLoading from "src/shared/components/Loading";
import Divider from "@mui/material/Divider";
import Share from "./Share";
import useModal from "src/shared/hooks/util/useModal";
import { timeDiff } from "src/shared/helper/timeDiff";
import StyledLink from "src/shared/components/StyledLink";

import { SavedService } from "src/services/SubDatabaseService";
import { useUserStore } from "src/store/userStore";

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

const PostTagging = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
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

const Hashtags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
`;

const PostTag = styled.div`
  background-color: #f0f2f5;
  padding: 5px;
  border-radius: 5px;
  color: #27b4fc;
`;

const Post = ({ post, initComt }) => {
  const { currentUserId } = useUserStore();
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  const [loading, setLoading] = useState(false);
  const [marked, setMarked] = useState(false);
  const pathToPostSaved = `${currentUserId}/saved/${post.id}`;
  useEffect(() => {
    SavedService.checkExistSubCollection(pathToPostSaved).then((res) => {
      if (res) {
        setMarked(true);
      }
    });
  }, []);
  const handleMarked = async () => {
    setLoading(true);
    if (marked) {
      await SavedService.removeSubCollection(pathToPostSaved);
    } else {
      await SavedService.createSubCollection(pathToPostSaved, post);
    }
    setLoading(false);
    setMarked(!marked);
  };

  const [showComment, setShowComment] = useState(initComt ? initComt : false);
  const { open, handleOpen, handleClose } = useModal();

  return (
    <PostWrapper>
      <PostHeader>
        <StyledLink to={`/profile/${post.authorId}`}>
          <ProfilePic src={post.authorAvatar} />
        </StyledLink>
        <PostInfo>
          <PostTagging>
            <StyledLink to={`/profile/${post.authorId}`}>
              <PostAuthor>{post.authorName}</PostAuthor>
            </StyledLink>
            {post.stayingWith && (
              <>
                <div>cùng với</div>
                {post.stayingWith.map((friend, index) => (
                  <StyledLink key={index} to={`/profile/${friend.id}`}>
                    <PostAuthor>
                      {friend.username}{" "}
                      {index !== post.stayingWith.length - 1 ? "," : ""}
                    </PostAuthor>
                  </StyledLink>
                ))}
              </>
            )}
            {post.location && <div>đang ở</div>}
            <PostAuthor>{post.location}</PostAuthor>
          </PostTagging>
          <PostTime>
            {timeDiff(
              post.createdAt.seconds * 1000 +
                post.createdAt.nanoseconds / 1000000
            )}
          </PostTime>
        </PostInfo>
        <Marked>
          {loading ? (
            <CircularLoading />
          ) : (
            <IconButton onClick={handleMarked}>
              <BookmarksIcon
                // @ts-ignore
                color={marked ? "primary" : "greyIcon"}
              />
            </IconButton>
          )}
        </Marked>
      </PostHeader>
      <PostContent>
        <p style={{ padding: "10px", marginLeft: "5px" }}>{post.text}</p>
        {post.tags && (
          <Hashtags>
            {post.tags.map((tag, index) => (
              <StyledLink key={index} to={`tag/${tag}`}>
                <PostTag>{tag}</PostTag>
              </StyledLink>
            ))}
          </Hashtags>
        )}
        {post.image && <PostImage src={post.image} />}
        {post.video && (
          <video controls style={{ width: "100%" }}>
            <source src={post.video} type="video/mp4" />
          </video>
        )}
      </PostContent>
      <PostFooter>
        <PostReactions>
          <ThumbUpAltIcon style={{ fontSize: "1.25rem" }} color="primary" />
          <SentimentVerySatisfiedIcon
            style={{ fontSize: "1.25rem" }}
            color="warning"
          />
          {post.reactions}
        </PostReactions>
        <Divider flexItem variant="middle" color="#bdbdbd" />
        <PostActions>
          <PostAction
            onClick={handleLike}
            style={{ color: like ? "#6ec924" : "rgba(91, 98, 106, 255)" }}
          >
            <ThumbUpAltIcon
              // @ts-ignore
              color={like ? "primary" : "greyIcon"}
            />{" "}
            Thích
          </PostAction>
          <PostAction
            onClick={() => setShowComment(true)}
            style={{ color: "rgba(91, 98, 106, 255)" }}
          >
            <QuestionAnswerIcon
              // @ts-ignore
              color="greyIcon"
            />
            Bình luận
          </PostAction>
          <PostAction
            onClick={handleOpen}
            style={{ color: "rgba(91, 98, 106, 255)" }}
          >
            <ShareIcon
              // @ts-ignore
              color="greyIcon"
            />
            Chia sẻ
          </PostAction>
        </PostActions>
      </PostFooter>
      <Divider flexItem variant="middle" color="#bdbdbd" />
      {showComment && (
          <Comments postId={post.id} />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Share post={post} handleClose={handleClose} />
      </Modal>
    </PostWrapper>
  );
};

export default Post;
