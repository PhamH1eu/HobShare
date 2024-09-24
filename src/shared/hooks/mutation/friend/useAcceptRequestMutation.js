import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useAcceptRequestMutation = () => {
  const queryClient = useQueryClient();

  async function acceptRequest({ fromUserId }) {
    const acceptFriendRequest = httpsCallable(functions, "acceptFriendRequest");
    return await acceptFriendRequest({ fromUserId });
  }

  const mutation = useMutation(acceptRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("received");
      queryClient.invalidateQueries("friend");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export default useAcceptRequestMutation;
