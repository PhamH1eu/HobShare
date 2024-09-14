import { GroupService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useMembers = (groupId) => {
  const { data: members, isLoading } = useQuery(["members", groupId], () =>
    GroupService.getAllSubCollection(`${groupId}/members`)
  );

  return {
    members,
    isLoading,
  };
};

export default useMembers;
