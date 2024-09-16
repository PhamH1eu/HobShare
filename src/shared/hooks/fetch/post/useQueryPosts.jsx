import { useQuery } from "react-query";
import { PostService } from "src/services/DatabaseService";

const useQueryPosts = (tag) => {
  const { data: posts, isLoading } = useQuery(["tags", tag], () =>
    PostService.query("tags", "array-contains", `#${tag}`)
  );

  return {
    posts,
    isLoading,
  };
};

export default useQueryPosts;
