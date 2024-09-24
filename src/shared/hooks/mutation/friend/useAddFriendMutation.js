import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useAddFriendMutation = () => {
  const queryClient = useQueryClient();

  async function sendRequest({ receiverId, description }) {
    const sendFriendRequest = httpsCallable(functions, "sendFriendRequest");
    return await sendFriendRequest({
      toUserId: receiverId,
      description: description, // Include a description with the friend request
    });
  }

  const mutation = useMutation(sendRequest, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("sent");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};

export default useAddFriendMutation;
