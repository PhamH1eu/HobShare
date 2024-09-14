import { GroupService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useGroups = () => {
  const { data: groups, isLoading } = useQuery(["groups"], () =>
    GroupService.getAll()
  );

  return {
    groups,
    isLoading,
  };
};

export default useGroups;
