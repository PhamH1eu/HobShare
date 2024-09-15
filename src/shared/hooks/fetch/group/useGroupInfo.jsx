import { GroupService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";
import { useUserStore } from "src/store/userStore";

const useGroupInfo = (id) => {
  const { currentUserId } = useUserStore();
  const { data: group, isLoading } = useQuery(["group", id], () =>
    GroupService.getDocument(id)
  );

  return {
    group,
    isAdmin: group?.admins.some((admin) => admin.userId === currentUserId),
    isLoading,
  };
};

export default useGroupInfo;
