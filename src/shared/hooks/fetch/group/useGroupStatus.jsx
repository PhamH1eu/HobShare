import { useQuery } from "react-query";
import { GroupService } from "src/services/SubDatabaseService";

const useGroupStatus = ({ groupId, currentUserId, isAdmin }) => {
  const { data: status, isLoading: isLoadingStatus } = useQuery("groupStatus", async () => {
    const isMember = await GroupService.checkExistSubCollection(
      `${groupId}/members/${currentUserId}`
    );
    if (isMember || isAdmin) {
      return "joined";
    }
    const isPending = await GroupService.checkExistSubCollection(
      `${groupId}/pendingRequests/${currentUserId}`
    );
    if (isPending) {
      return "pending";
    }
    return "outsider";
  });

  return { status, isLoadingStatus };
};

export default useGroupStatus;
