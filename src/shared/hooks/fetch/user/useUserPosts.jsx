import { useQuery } from "react-query";
import { UserService } from "src/services/SubDatabaseService";

const useUserPosts = (currentUserId) => {
  const { data: posts, isLoading } = useQuery(
    ["userposts", currentUserId],
    () => UserService.getAllSubCollection(`${currentUserId}/posts`)
  );

  return {
    posts,
    isLoading,
  };
};

export default useUserPosts;
