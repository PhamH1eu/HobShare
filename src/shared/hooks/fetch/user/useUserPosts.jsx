import { useQuery } from "react-query";
import { UserService } from "src/services/SubDatabaseService";

const useUserPosts = (currentUserId) => {
  const { data: posts, isLoading } = useQuery(
    ["userposts", currentUserId],
    () => UserService.getAllSubCollection(`${currentUserId}/posts`)
  );

  if (!isLoading) {
    posts.sort((a, b) => b.createdAt - a.createdAt);
  }

  return {
    posts,
    isLoading,
  };
};

export default useUserPosts;
