import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useAcceptRequestMutation = () => {
  const queryClient = useQueryClient();

  async function acceptRequest({ fromUserId }) {
    const acceptFriendRequest = httpsCallable(functions, "acceptFriendRequest");
    acceptFriendRequest({ fromUserId })
      .then((result) => {
        console.log(result.data); // Friend request sent
      })
      .catch((error) => {
        console.error("Error sending friend request:", error.message);
      });
  }

  const mutation = useMutation(acceptRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("received");
    },
  });

  return mutation;
};

export default useAcceptRequestMutation;
