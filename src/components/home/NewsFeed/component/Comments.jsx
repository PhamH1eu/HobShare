import { CommentSection } from "react-comments-section";
import { useUserStore } from "src/store/userStore";
import "react-comments-section/dist/index.css";
import "./comment.css";

const Comments = () => {
  const { currentUser } = useUserStore();
  const data = [
    {
      userId: "02b",
      comId: "3",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
    {
      userId: "02b",
      comId: "4",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];

  return (
    <CommentSection
      currentUser={{
        currentUserId: "01a",
        currentUserImg: currentUser.avatar,
        currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        currentUserFullName: currentUser.username,
      }}
      commentData={data}
      onSubmitAction={(data) => console.log("check submit, ", data)}
      currentData={(data) => {
        console.log("curent data", data);
      }}
      titleStyle={{ display: "none" }}
      hrStyle={{ display: "none" }}
      submitBtnStyle={{ fontSize: "0.8rem" }}
      cancelBtnStyle={{ fontSize: "0.8rem" }}
    />
  );
};

export default Comments;
