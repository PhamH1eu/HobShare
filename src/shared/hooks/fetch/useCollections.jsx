import { useQuery } from "react-query";
import { SavedService } from "src/services/SubDatabaseService";
import { useUserStore } from "src/store/userStore";

const useCollections = () => {
  const { currentUserId } = useUserStore();
  const { data: collectionUser, isLoading } = useQuery("collections", () =>
    SavedService.getDocument(`${currentUserId}`)
  );

  const collections = collectionUser?.collections || [];

  return {
    collections,
    isLoading,
  };
};

export default useCollections;
