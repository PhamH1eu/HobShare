import { useQuery } from "react-query";
import { UserService } from "src/services/SubDatabaseService";
import { useUserStore } from "src/store/userStore";

const useMemories = (range) => {
  const { currentUserId } = useUserStore();
  const { data: posts, isLoading } = useQuery(["memories", range], () =>
    UserService.queryByDate(`${currentUserId}/posts`, range)
  );

  return {
    posts,
    isLoading,
  };
};

export default useMemories;
