import { SavedService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useSavedPosts = (id, collection) => {
  const { data: posts, isLoading } = useQuery([collection, id], () =>
    SavedService.getAllSubCollection(`${id}/${collection}`)
  );

  return {
    posts,
    isLoading,
  };
};

export default useSavedPosts;
