import { httpsCallable } from "firebase/functions";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";

const useRecNewGroups = () => {
  const { data, isLoading } = useQuery(
    "new_groups",
    () => {
      const findNewGroups = httpsCallable(functions, "recommendedGroups");
      return findNewGroups().then((result) => result.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  return {
    groups:
      data?.recommendedGroups.sort((a, b) => b.memberCount - a.memberCount) ||
      [],
    isLoading: isLoading,
  };
};

export default useRecNewGroups;
