import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useDenyFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  async function denyRequest({ senderId }) {
    const denyFriendRequest = httpsCallable(functions, "denyFriendRequest");
    return await denyFriendRequest({
      senderId, // The user who sent the friend request
    });
  }

  const mutation = useMutation(denyRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("received");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export default useDenyFriendRequestMutation;
