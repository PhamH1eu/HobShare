import { httpsCallable } from "firebase/functions";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";

const useUserFriend = () => {
  const { data, isLoading } = useQuery(
    "friend",
    () => {
      const getAllFriends = httpsCallable(functions, "getAllFriends");
      return getAllFriends().then((result) => result.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  return {
    friends: data,
    isLoading: isLoading,
  };
};

export default useUserFriend;
