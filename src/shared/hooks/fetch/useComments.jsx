import { useQuery } from "react-query";
import { PostService } from "src/services/SubDatabaseService";

const useComments = (postId) => {
  const { data: comments, isLoading } = useQuery(["comments", postId], () =>
    PostService.getAllSubCollection(`${postId}/comments`)
  );

  return {
    comments,
    isLoading,
  };
};

export default useComments;
