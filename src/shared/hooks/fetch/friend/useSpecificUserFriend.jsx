import { httpsCallable } from "firebase/functions";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";

const useSpecificUserFriend = (userId) => {
  const { data, isLoading } = useQuery(
    ["user_friend", userId],
    () => {
      const getAllFriends = httpsCallable(functions, "getAllFriendsOfUser");
      return getAllFriends({ userId }).then((result) => result.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );
  console.log(data);

  return {
    friends: data?.friends || [],
    isLoading: isLoading,
  };
};

export default useSpecificUserFriend;
