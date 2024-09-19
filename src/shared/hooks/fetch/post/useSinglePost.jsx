import { useQueries } from "react-query";
import { useUserStore } from "src/store/userStore";

import { PostService } from "src/services/SubDatabaseService";

const useSinglePost = (id) => {
  const { currentUserId } = useUserStore();

  const [postQuery, likeQuery, countQuery] = useQueries([
    {
      queryKey: ["posts", id],
      queryFn: () => PostService.getDocument(id),
    },
    {
      queryKey: ["like", id, currentUserId],
      queryFn: () =>
        PostService.checkExistSubCollection(`${id}/like/${currentUserId}`),
    },
    {
      queryKey: ["count", id],
      queryFn: () => PostService.count(`${id}/like`),
    },
  ]);

  const post = {
    ...postQuery.data,
    id: id,
  };

  return {
    post,
    likeCount: countQuery.data,
    isLike: likeQuery.data,
    isLoading:
      postQuery.isLoading || likeQuery.isLoading || countQuery.isLoading,
    isRefetching: likeQuery.isRefetching,
  };
};

export default useSinglePost;
