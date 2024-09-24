import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useCancelFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  async function cancelRequest({ receiverId }) {
    const cancelFriendRequest = httpsCallable(functions, "cancelFriendRequest");
    cancelFriendRequest({
      toUserId: receiverId,
    })
      .then((result) => {
        console.log(result.data); // Friend request sent
      })
      .catch((error) => {
        console.error("Error sending friend request:", error.message);
      });
  }

  const mutation = useMutation(cancelRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("sent");
    },
  });

  return mutation;
};

export default useCancelFriendRequestMutation;
