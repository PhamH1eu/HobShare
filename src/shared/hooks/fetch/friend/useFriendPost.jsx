import { httpsCallable } from "firebase/functions";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";

const useFriendsPosts = () => {
  const { data, isLoading } = useQuery(
    "friends_recent_posts",
    () => {
      const findFriendPosts = httpsCallable(functions, "getFriendPosts");
      return findFriendPosts().then((result) => result.data);
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

export default useFriendsPosts;
