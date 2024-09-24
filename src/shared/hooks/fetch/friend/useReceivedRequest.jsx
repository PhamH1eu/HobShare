import { useUserStore } from "src/store/userStore";
import { useQuery } from "react-query";
import { UserService } from "src/services/SubDatabaseService";

const useReceivedRequest = () => {
  const { currentUserId } = useUserStore();
  const { data, isLoading } = useQuery(["received", currentUserId], () =>
    UserService.getAllSubCollection(`${currentUserId}/friendRequests`)
  );

  return {
    receivedRequests: data,
    isLoadingReceived: isLoading,
  };
};

export default useReceivedRequest;
