import { PostService } from "src/services/SubDatabaseService";
import { useQuery } from "react-query";

const useLikers = (id) => {
  const { data: users, isLoading } = useQuery(["postsliker", id], () =>
    PostService.getAllSubCollection(`${id}/like`)
  );

  return {
    users,
    isLoading,
  };
};

export default useLikers;
