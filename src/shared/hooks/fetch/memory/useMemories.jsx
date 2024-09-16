import { useQuery } from "react-query";
import { PostService } from "src/services/SubDatabaseService";

const useMemories = (range) => {
  const { data: posts, isLoading } = useQuery(["memories", range], () =>
    PostService.queryByDate(range)
  );

  return {
    posts,
    isLoading,
  };
};

export default useMemories;
