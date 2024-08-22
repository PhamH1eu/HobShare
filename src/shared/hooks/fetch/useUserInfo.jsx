import { UserService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const useUserInfo = (userId) => {
  const { data: user, isLoading } = useQuery(["user", userId], () =>
    UserService.get(userId)
  );

  return {
    data: user?.data(),
    isLoading,
  };
};

export default useUserInfo;
