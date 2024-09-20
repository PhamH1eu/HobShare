import { useQuery } from "react-query";
import { PopularHashtagService } from "src/services/SubDatabaseService";

const usePopularHashtags = () => {
  const { data: tags, isLoading } = useQuery("tags", () =>
    PopularHashtagService.getAll()
  );

  return {
    tags,
    isLoading,
  };
};

export default usePopularHashtags;
