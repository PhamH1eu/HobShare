import { useQuery } from "react-query";
import { GroupService } from "src/services/SubDatabaseService";

const usePendingRequests = (groupId) => {
  const { data, isLoading } = useQuery("pendingRequests", () =>
    GroupService.getAllSubCollection(`${groupId}/pendingRequests`)
  );

  return {
    pendingRequests: data,
    count: data?.length,
    isLoading,
  };
};

export default usePendingRequests;
