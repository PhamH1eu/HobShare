import { useQuery } from "react-query";
import { UserService } from "src/services/DatabaseService";

const useSuggestedFriend = () => {
  const { data: users, isLoading } = useQuery("users", () =>
    UserService.getAll()
  );

  return {
    users,
    isLoading,
  };
};

export default useSuggestedFriend;
