import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useCancelFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  async function cancelRequest({ receiverId }) {
    const cancelFriendRequest = httpsCallable(functions, "cancelFriendRequest");
    return await cancelFriendRequest({
      toUserId: receiverId,
    });
  }

  const mutation = useMutation(cancelRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("sent");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export default useCancelFriendRequestMutation;
