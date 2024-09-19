import { HashtagService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useHashtagInfo = (id) => {
  const { data: hashtagInfo, isLoading } = useQuery(["hashtag", id], () =>
    HashtagService.getDocument(id)
  );

  return {
    hashtagInfo,
    isLoadingHashtag: isLoading,
  };
};

export default useHashtagInfo;
