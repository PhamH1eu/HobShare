import { PostService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const usePosts = () => {
  const { data: posts, isLoading } = useQuery("posts", () =>
    PostService.getAll()
  );

  return {
    posts,
    isLoading,
  };
};

export default usePosts;
