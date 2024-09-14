import { useQueries } from "react-query";
import { UserService } from "src/services/SubDatabaseService";

const useUserGroup = (userId) => {
  const [adminGroupQuery, joinedGroupQuery] = useQueries([
    {
      queryKey: ["adminGroup", userId],
      queryFn: () => UserService.getAllSubCollection(`${userId}/admingroups`),
    },
    {
      queryKey: ["joinedGroup", userId],
      queryFn: () => UserService.getAllSubCollection(`${userId}/joinedgroups`),
    },
  ]);

  return {
    admins: adminGroupQuery.data,
    joined: joinedGroupQuery.data,
    isLoading: adminGroupQuery.isLoading || joinedGroupQuery.isLoading,
  };
};

export default useUserGroup;
