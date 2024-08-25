import { SavedService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useSavedPosts = (id) => {
  const { data: posts, isLoading } = useQuery(["saved", id], () =>
    SavedService.getAllSubCollection(`${id}/savedPosts`)
  );

  return {
    posts,
    isLoading,
  };
};

export default useSavedPosts;
