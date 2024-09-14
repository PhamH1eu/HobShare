import { GroupService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useMembersCount = (groupId) => {
  const { data: membersCount, isLoading } = useQuery(["membersCount", groupId], () =>
    GroupService.count(`${groupId}/members`)
  );

  return {
    membersCount: membersCount + 1,
    isLoading,
  };
};

export default useMembersCount;
