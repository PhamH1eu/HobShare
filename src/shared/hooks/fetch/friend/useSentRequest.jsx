import { useUserStore } from "src/store/userStore";
import { useQuery } from "react-query";
import { UserService } from "src/services/SubDatabaseService";

const useSentRequest = () => {
  const { currentUserId } = useUserStore();
  const { data, isLoading } = useQuery(["sent", currentUserId], () =>
    UserService.getAllSubCollection(`${currentUserId}/sentRequests`)
  );

  return {
    sentRequests: data,
    isLoadingSent: isLoading,
  };
};

export default useSentRequest;
