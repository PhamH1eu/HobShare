// @ts-nocheck
import styled from "styled-components";
import { useEffect, useState } from "react";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import Comments from "./Comments";

import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CircularLoading from "src/shared/components/Loading";
import Divider from "@mui/material/Divider";
import Share from "./Share";
import useModal from "src/shared/hooks/util/useModal";
import { timeDiff } from "src/shared/helper/timeDiff";
import StyledLink from "src/shared/components/StyledLink";
import { LoadingButton } from "@mui/lab";
import { styled as MuiStyled } from "@mui/material";

import { SavedService } from "src/services/SubDatabaseService";
import { useUserStore } from "src/store/userStore";
import { PostService } from "src/services/DatabaseService";
import { PostService as LikeService } from "src/services/SubDatabaseService";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import useSinglePost from "src/shared/hooks/fetch/post/useSinglePost";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import UsersLike from "./UsersLike";

const PostWrapper = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  margin: 25px 0;
`;

const PostLoading = styled.div`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  margin: 25px 0;
  min-height: 300px;
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
  cursor: pointer;
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

  span {
    width: 24px !important;
    height: 24px !important;
  }

  &:hover {
    background-color: rgba(228, 230, 233, 255);
  }
`;

const Marked = styled.div`
  margin-left: auto;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const DeleteButton = styled.div`
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

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 8px;
`;

const YesButton = MuiStyled(LoadingButton)`
  background-color: #6ec924;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5cad1b;
  }
`;

const NoButton = MuiStyled(LoadingButton)`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  p {
    font-weight: bold;
    color: #999;
    font-size: 14px;
  }  
  p:hover {
    text-decoration: underline;
  }
    span:hover {
    text-decoration: underline;
  }
}
`;

const Post = ({ postId, initComt, isAdminGroup }) => {
  const queryClient = useQueryClient();
  const { post, likeCount, isLike, isRefetching, isLoading } =
    useSinglePost(postId);
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  const mutation = useMutation(
    async () => {
      if (!isLike) {
        await LikeService.createSubCollection(
          `${postId}/like/${currentUserId}`,
          {
            avatar: currentUser.avatar,
            username: currentUser.username,
            userId: currentUser.id,
          }
        );
      } else {
        await LikeService.removeSubCollection(
          `${postId}/like/${currentUserId}`
        );
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["like", postId, currentUserId]);
        queryClient.invalidateQueries(["count", postId]);
      },
    }
  );
  const handleLike = async () => {
    mutation.mutate();
  };

  const [loading, setLoading] = useState(false);
  const [marked, setMarked] = useState(false);
  const pathToPostSaved = `${currentUserId}/saved/${postId}`;
  useEffect(() => {
    SavedService.checkExistSubCollection(pathToPostSaved).then((res) => {
      if (res) {
        setMarked(true);
      }
    });
  }, [pathToPostSaved]);
  const handleMarked = async () => {
    setLoading(true);
    console.log(post);

    if (marked) {
      await SavedService.removeSubCollection(pathToPostSaved);
    } else {
      await SavedService.createSubCollection(pathToPostSaved, post);
    }
    setLoading(false);
    setMarked(!marked);
  };
  const handleDeletePost = async () => {
    setLoading(true);
    await PostService.delete(postId);
    await LikeService.removeCollection(`${postId}/comments`);
    queryClient.invalidateQueries("posts");
    setLoading(false);
    handleCloseDeleteModal();
  };

  const [showComment, setShowComment] = useState(initComt ? initComt : false);
  const { open, handleOpen, handleClose } = useModal();
  const {
    open: openDeleteModal,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();
  const {
    open: openUserLikeModal,
    handleOpen: handleOpenUserLikeModal,
    handleClose: handleCloseUserLikeModal,
  } = useModal();

  const location = useLocation();
  const isNotGroupPath = location.pathname.startsWith("/group/");
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <PostLoading>
        <CircularLoading />
      </PostLoading>
    );
  }

  const handleShowAll = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedText =
    post.text.length > 130 ? `${post.text.substring(0, 130)}...` : post.text;

  return (
    <PostWrapper>
      <PostHeader>
        {post.groupId && !isNotGroupPath ? (
          <StyledLink to={`/group/${post.groupId}`}>
            <ProfilePic src={post.groupWallpaper} />
          </StyledLink>
        ) : (
          <StyledLink to={`/profile/${post.authorId}`}>
            <ProfilePic src={post.authorAvatar} />
          </StyledLink>
        )}
        {post.groupId && !isNotGroupPath ? (
          <PostInfo>
            <PostTagging>
              <StyledLink to={`/group/${post.groupId}`}>
                <PostAuthor>{post.groupName}</PostAuthor>
              </StyledLink>
            </PostTagging>
            <GroupHeader>
              <StyledLink to={`/profile/${post.authorId}`}>
                <p>{post.authorName}</p>
              </StyledLink>
              <span>·</span>
              <StyledLink to={`/post/${postId}`}>
                <PostTime>
                  {timeDiff(
                    post.createdAt.seconds * 1000 +
                      post.createdAt.nanoseconds / 1000000
                  )}
                </PostTime>
              </StyledLink>
            </GroupHeader>
          </PostInfo>
        ) : (
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
            <StyledLink to={`/post/${postId}`}>
              <PostTime>
                {timeDiff(
                  post.createdAt.seconds * 1000 +
                    post.createdAt.nanoseconds / 1000000
                )}
              </PostTime>
            </StyledLink>
          </PostInfo>
        )}
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
        {(currentUserId === post.authorId || isAdminGroup) && (
          <DeleteButton>
            <IconButton onClick={handleOpenDeleteModal}>
              <BackspaceIcon
                // @ts-ignore
                color="greyIcon"
              />
            </IconButton>
          </DeleteButton>
        )}
      </PostHeader>
      <div>
        <div style={{ display: "flex" }}>
          <p style={{ padding: "10px", marginLeft: "5px" }}>
            {isExpanded ? post.text : truncatedText}
            {post.text.length > 130 && (
              <span
                onClick={handleShowAll}
                style={{
                  margin: "0 5px",
                  color: "#6ec924",
                  cursor: "pointer",
                }}
              >
                {isExpanded ? "Ẩn bớt" : "Xem thêm"}
              </span>
            )}
          </p>
        </div>
        {post.groupId && !isNotGroupPath && (
          <PostTagging>
            {post.stayingWith && (
              <>
                <div style={{ marginLeft: "16px", marginBottom: "4px" }}>
                  —— cùng với
                </div>
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
        )}
        {post.tags && (
          <Hashtags>
            {post.tags.map((tag, index) => (
              <StyledLink key={index} to={`/hashtag/${tag.replace("#", "")}`}>
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
      </div>
      <PostFooter>
        <PostReactions onClick={handleOpenUserLikeModal}>
          <ThumbUpAltIcon style={{ fontSize: "1.25rem" }} color="primary" />
          {likeCount}
        </PostReactions>
        <Divider flexItem variant="middle" color="#bdbdbd" />
        <PostActions>
          <PostAction
            onClick={handleLike}
            style={{ color: isLike ? "#6ec924" : "rgba(91, 98, 106, 255)" }}
          >
            {isRefetching || mutation.isLoading ? (
              <CircularLoading />
            ) : (
              <>
                <ThumbUpAltIcon
                  // @ts-ignore
                  color={isLike ? "primary" : "greyIcon"}
                />{" "}
                Thích
              </>
            )}
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
      {showComment && <Comments postId={postId} authorId={post.authorId} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Share post={post} handleClose={handleClose} />
      </Modal>
      <Modal
        open={openUserLikeModal}
        onClose={handleCloseUserLikeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UsersLike postId={postId} handleClose={handleCloseUserLikeModal} />
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "12px",
          }}
        >
          <ModalTitle>Bạn có chắc chắn muốn xoá bài viết này không?</ModalTitle>
          <ButtonGroup>
            <YesButton loading={loading} onClick={handleDeletePost}>
              Xoá
            </YesButton>
            <NoButton onClick={handleCloseDeleteModal}>Huỷ</NoButton>
          </ButtonGroup>
        </Box>
      </Modal>
    </PostWrapper>
  );
};

export default Post;
