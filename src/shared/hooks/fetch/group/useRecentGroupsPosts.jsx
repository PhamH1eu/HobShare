import { httpsCallable } from "firebase/functions";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";

const useRecentGroupsPosts = () => {
  const { data, isLoading } = useQuery(
    "groups_recent_posts",
    () => {
      const findRecentPostsGroups = httpsCallable(
        functions,
        "getUserGroupPosts"
      );
      return findRecentPostsGroups().then((result) => result.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );

  return {
    posts: data?.postIds || [],
    isLoading: isLoading,
  };
};

export default useRecentGroupsPosts;
