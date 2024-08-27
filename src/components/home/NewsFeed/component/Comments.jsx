import { CommentSection } from "@pmhieu/react-comments-section";
import { useUserStore } from "src/store/userStore";
import "@pmhieu/react-comments-section/dist/index.css";
import "./comment.css";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

import { PostService } from "src/services/SubDatabaseService";
import useComments from "src/shared/hooks/fetch/useComments";
import CircularLoading from "src/shared/components/Loading";
import { styled } from "styled-components";

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

const Comments = ({ postId }) => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  const { comments, isLoading } = useComments(postId);

  const comment = async (data) => {
    const path = `${postId}/comments/${data.comId}`;
    await PostService.createSubCollection(path, data);
  };

  const reply = async (data) => {
    if (data.parentOfRepliedCommentId === undefined) {
      data.parentOfRepliedCommentId = data.repliedToCommentId;
    }
    const path = `${postId}/comments/${data.parentOfRepliedCommentId}`;
    await PostService.addDataToArray(path, "replies", data);
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
      {comments.length > 0 && (
        <LoadComments onClick={() => console.log("load them di")}>
          Xem thêm bình luận
        </LoadComments>
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
