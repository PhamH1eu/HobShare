import { useQueries } from "react-query";
import { useUserStore } from "src/store/userStore";

import { PostService } from "src/services/SubDatabaseService";

const useSinglePost = (id) => {
  const { currentUserId } = useUserStore();

  const [postQuery, likeQuery] = useQueries([
    {
      queryKey: ["posts", id],
      queryFn: () => PostService.getDocument(id),
    },
    {
      queryKey: ["like", id, currentUserId],
      queryFn: () =>
        PostService.checkExistSubCollection(`${id}/like/${currentUserId}`),
    },
  ]);
  
  const post = {
    ...postQuery.data,
    id: postQuery.data?.id,
  };

  return {
    post,
    isLike: likeQuery.data,
    isLoading: postQuery.isLoading || likeQuery.isLoading,
    isRefetching: likeQuery.isRefetching
  };
};

export default useSinglePost;
