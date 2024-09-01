import { CommentSection } from "@pmhieu/react-comments-section";
import { useUserStore } from "src/store/userStore";
import "@pmhieu/react-comments-section/dist/index.css";
import "./comment.css";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

import { PostService } from "src/services/SubDatabaseService";
import { NotificationService } from "src/services/SubDatabaseService";
import useComments from "src/shared/hooks/fetch/useComments";
import CircularLoading from "src/shared/components/Loading";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { increment } from "firebase/firestore";

const LoadComments = styled.div`
  cursor: pointer;
  color: rgba(91, 98, 106, 255);
  font-size: 14px;
  font-weight: 500;
  padding: 10px;
  padding-bottom: 0;

  &:hover {
    text-decoration: underline;
    color: #08c4fc;
  }
`;

const Comments = ({ postId, authorId }) => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  const { comments: initialComments, isLoading } = useComments(postId);

  const [comments, setTotalComments] = useState(
    initialComments ? initialComments : []
  );
  const [lastDoc, setLastDoc] = useState(null);
  const loadMore = async () => {
    const moreComments = await PostService.loadMoreSubCollection(
      `${postId}/comments`,
      2,
      lastDoc
    );
    if (moreComments.length < 2) {
      setLastDoc(null);
    } else {
      setLastDoc(moreComments[moreComments.length - 1].createdAt);
    }
    setTotalComments([...comments, ...moreComments]);
  };

  useEffect(() => {
    if (initialComments?.length > 0) {
      setTotalComments(initialComments);
      setLastDoc(initialComments[initialComments.length - 1].createdAt);
    }
  }, [initialComments]);

  const comment = async (data) => {
    const path = `${postId}/comments/${data.comId}`;
    await PostService.createSubCollection(path, data);
    if (authorId !== currentUserId) {
      await NotificationService.createSubCollection(
        `${authorId}/notifications/${data.comId}`,
        {
          sourceName: currentUser.username,
          sourceImage: currentUser.avatar,
          content: "đã bình luận về bài viết của bạn",
          isRead: false,
          type: "comment",
          url: `/post/${postId}`,
        }
      );
      await NotificationService.updateSubCollection(
        `${authorId}`,
        "unreadNotis",
        increment(1)
      );
    }
  };

  const reply = async (data) => {
    var repliedUserId = currentUserId;
    if (data.parentOfRepliedCommentId === undefined) {
      const repliedComment = comments.find(
        (item) => item.comId === data.repliedToCommentId
      );
      repliedUserId = repliedComment.userId;
    } else {
      const repliedComment = comments.find(
        (item) => item.comId === data.parentOfRepliedCommentId
      );
      repliedUserId = repliedComment.replies.find(
        (item) => item.comId === data.repliedToCommentId
      ).userId;
    }
    if (data.parentOfRepliedCommentId === undefined) {
      data.parentOfRepliedCommentId = data.repliedToCommentId;
    }
    const path = `${postId}/comments/${data.parentOfRepliedCommentId}`;
    await PostService.addDataToArray(path, "replies", data);
    await NotificationService.createSubCollection(
      `${repliedUserId}/notifications/${data.comId}`,
      {
        sourceName: currentUser.username,
        sourceImage: currentUser.avatar,
        content: "đã phản hồi bình luận của bạn",
        isRead: false,
        type: "comment",
        url: `/post/${postId}`,
      }
    );
    await NotificationService.updateSubCollection(
      `${authorId}`,
      "unreadNotis",
      increment(1)
    );
  };

  const edit = async (data) => {
    if (data.parentOfEditedCommentId === undefined) {
      const path = `${postId}/comments/${data.comId}`;
      await PostService.updateSubCollection(path, "text", data.text);
    } else {
      const currentComment = comments.filter(
        (item) => item.comId === data.parentOfEditedCommentId
      );
      const path = `${postId}/comments/${data.parentOfEditedCommentId}`;
      await PostService.updateSubCollection(
        path,
        "replies",
        currentComment[0].replies
      );
    }
  };

  const deleteComment = async (data) => {
    if (data.parentOfDeleteId) {
      const commentBeforeDelete = await PostService.getAllSubCollection(
        `${postId}/comments`
      );
      const parentOfRemovedComment = commentBeforeDelete.find(
        (item) => item.comId === data.parentOfDeleteId
      );
      const commentToRemove = parentOfRemovedComment.replies.find(
        (item) => item.comId === data.comIdToDelete
      );
      const path = `${postId}/comments/${data.parentOfDeleteId}`;
      await PostService.removeDataFromArray(path, "replies", commentToRemove);
    } else {
      const commentToRemove = comments.find(
        (item) => item.comId === data.comIdToDelete
      );
      const path = `${postId}/comments/${commentToRemove.comId}`;
      await PostService.removeSubCollection(path);
    }
  };

  if (isLoading) {
    return <CircularLoading />;
  }

  return (
    <>
      {comments.length > 0 && lastDoc && (
        <LoadComments onClick={loadMore}>Xem thêm bình luận</LoadComments>
      )}
      <CommentSection
        currentUser={{
          currentUserId: currentUserId,
          currentUserImg: currentUser.avatar,
          currentUserProfile: `http://127.0.0.1:5173/profile/${currentUserId}`,
          currentUserFullName: currentUser.username,
        }}
        commentData={comments}
        onSubmitAction={comment}
        onReplyAction={reply}
        onEditAction={edit}
        onDeleteAction={deleteComment}
        titleStyle={{ display: "none" }}
        hrStyle={{ display: "none" }}
        submitBtnStyle={{ fontSize: "0.8rem", content: "123" }}
        cancelBtnStyle={{ fontSize: "0.8rem" }}
        logIn={{
          loginLink: "",
          signupLink: "",
        }}
        customNoComment={() => customNoComment()}
      />
    </>
  );
};

const customNoComment = () => (
  <div className="no-com">Chưa có bình luận nào ở đây !</div>
);

export default Comments;
