import { CommentSection } from "@pmhieu/react-comments-section";
import { useUserStore } from "src/store/userStore";
import "@pmhieu/react-comments-section/dist/index.css";
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
      replies: [
        {
          userId: "02c",
          comId: "2",
          fullName: "Lily",
          userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
          text: "I think you have a point🤔",
          avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
          replies: [],
        },
      ],
    },
    {
      userId: "02d",
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
        currentUserProfile: `http://127.0.0.1:5173/profile/${currentUser.id}`,
        currentUserFullName: currentUser.username,
      }}
      commentData={data}
      onSubmitAction={(data) => console.log("check submit, ", data)}
      currentData={(data) => {
        console.log("curent data", data);
      }}
      titleStyle={{ display: "none" }}
      hrStyle={{ display: "none" }}
      submitBtnStyle={{ fontSize: "0.8rem", content: "123" }}
      cancelBtnStyle={{ fontSize: "0.8rem" }}
      logIn={{
        loginLink: "",
        signupLink: "",
      }}
    />
  );
};

export default Comments;
