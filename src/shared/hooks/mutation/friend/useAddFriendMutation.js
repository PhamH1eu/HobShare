import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useAddFriendMutation = () => {
  const queryClient = useQueryClient();

  async function sendRequest({ receiverId, description }) {
    const sendFriendRequest = httpsCallable(functions, "sendFriendRequest");
    sendFriendRequest({
      toUserId: receiverId,
      description: description, // Include a description with the friend request
    })
      .then((result) => {
        console.log(result.data); // Friend request sent
      })
      .catch((error) => {
        console.error("Error sending friend request:", error.message);
      });
  }

  const mutation = useMutation(sendRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("sent");
    },
  });

  return mutation;
};

export default useAddFriendMutation;
