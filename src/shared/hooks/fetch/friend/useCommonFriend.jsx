import { useUserStore } from "src/store/userStore";
import { useQuery } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useCommonFriend = (targetUserId) => {
  const { currentUserId } = useUserStore();

  // Reference to the Firebase function
  const getCommonFriendsCount = httpsCallable(
    functions,
    "getCommonFriendsCount"
  );

  // Fetch the common friends count
  const { data, isLoading } = useQuery(
    ["common", currentUserId, targetUserId],
    async () => {
      if (!currentUserId || !targetUserId) {
        throw new Error("Both currentUserId and targetUserId are required");
      }

      // Call the Firebase Cloud Function
      const response = await getCommonFriendsCount({
        receiverUserId: targetUserId,
      });
      console.log(response.data.commonFriendsCount);

      // Return the number of common friends
      return response.data.commonFriendsCount;
    },
    {
      enabled: !!currentUserId && !!targetUserId, // Only enable the query if both IDs exist
    }
  );

  return {
    commonFriends: data,
    isLoading,
  };
};

export default useCommonFriend;
