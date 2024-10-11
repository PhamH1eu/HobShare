import { useUserStore } from "src/store/userStore";
import { useQuery } from "react-query";

const useCommonFriend = (targetUserId) => {
  const { currentUserId } = useUserStore();
  const { data, isLoading } = useQuery(
    ["common", currentUserId, targetUserId],
    () => {
      return 2;
    }
  );

  return {
    commonsFriend: data,
    isLoading: isLoading,
  };
};

export default useCommonFriend;
