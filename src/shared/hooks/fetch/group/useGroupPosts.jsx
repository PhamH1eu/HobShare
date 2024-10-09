import { useQuery } from "react-query";
import { GroupService } from "src/services/SubDatabaseService";

const useGroupPosts = (groupId) => {
  const { data: posts, isLoading } = useQuery(["groupposts", groupId], () =>
    GroupService.getAllSubCollection(`${groupId}/posts`)
  );

  return {
    posts: posts || [],
    isLoading,
  };
};

export default useGroupPosts;
