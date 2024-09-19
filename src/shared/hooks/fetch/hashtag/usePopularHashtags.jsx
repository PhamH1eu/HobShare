import { useQuery } from "react-query";
import { HashtagService } from "src/services/SubDatabaseService";

const usePopularHashtags = () => {
  const { data: tags, isLoading } = useQuery("tags", () =>
    HashtagService.queryByMostCount()
  );

  return {
    tags,
    isLoading,
  };
};

export default usePopularHashtags;
