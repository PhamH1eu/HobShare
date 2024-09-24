import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useDenyFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  async function denyRequest({ senderId }) {
    const denyFriendRequest = httpsCallable(functions, "denyFriendRequest");
    denyFriendRequest({
      senderId, // The user who sent the friend request
    })
      .then((result) => {
        console.log(result.data); // Friend request sent
      })
      .catch((error) => {
        console.error("Error sending friend request:", error.message);
      });
  }

  const mutation = useMutation(denyRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("sent");
    },
  });

  return mutation;
};

export default useDenyFriendRequestMutation;
