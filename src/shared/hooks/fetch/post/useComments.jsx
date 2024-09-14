import { useQuery } from "react-query";
import { PostService } from "src/services/SubDatabaseService";

const useComments = (postId) => {
  const { data: comments, isLoading } = useQuery(["comments", postId], () =>
    PostService.getSubCollectionWithLimit(`${postId}/comments`, 2)
  );

  return {
    comments,
    isLoading,
  };
};

export default useComments;
