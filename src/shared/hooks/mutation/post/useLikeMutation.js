import { useMutation, useQueryClient } from "react-query";
import { useUserStore } from "src/store/userStore";
import useUserInfo from "../../fetch/user/useUserInfo";
import {
  NotificationService,
  PostService,
} from "src/services/SubDatabaseService";
import { increment } from "firebase/firestore";

const useLikeMutation = ({ isLike, postId, authorId }) => {
  const queryClient = useQueryClient();
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  const mutation = useMutation(
    async () => {
      if (!isLike) {
        await PostService.createSubCollection(
          `${postId}/like/${currentUserId}`,
          {
            avatar: currentUser.avatar,
            username: currentUser.username,
            userId: currentUser.id,
          }
        );
        if (authorId !== currentUserId) {
          await NotificationService.updateDocument(`${authorId}`, {
            unreadNotis: increment(1),
          });
          await NotificationService.createSubCollection(
            `${authorId}/notifications/${postId}`,
            {
              sourceName: currentUser.username,
              sourceImage: currentUser.avatar,
              content: "đã thích bài viết của bạn",
              isRead: false,
              type: "like",
              url: `/post/${postId}`,
            }
          );
        }
      } else {
        await PostService.removeSubCollection(
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

  return mutation;
};

export default useLikeMutation;
