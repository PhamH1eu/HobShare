import { PostService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const useSinglePost = (id) => {
  const { data, isLoading } = useQuery(["posts", id], () =>
    PostService.get(id)
  );
  const post = {
    ...data?.data(),
    id: data?.id,
  };

  return {
    post,
    isLoading,
  };
};

export default useSinglePost;
