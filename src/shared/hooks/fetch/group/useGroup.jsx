import { GroupService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useGroupInfo = (id) => {
  const { data: group, isLoading } = useQuery(["group", id], () =>
    GroupService.getDocument(id)
  );

  return {
    group,
    isLoading,
  };
};

export default useGroupInfo;
