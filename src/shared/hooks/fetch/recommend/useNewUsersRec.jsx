import { httpsCallable } from "firebase/functions";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";

const useRecNewUsers = () => {
  const { data, isLoading } = useQuery(
    "new_users",
    () => {
      const findSimilarUsers = httpsCallable(functions, "findSimilarUsers");
      return findSimilarUsers().then((result) => result.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  return {
    friends: data?.similarUsers || [],
    isLoading: isLoading,
  };
};

export default useRecNewUsers;
