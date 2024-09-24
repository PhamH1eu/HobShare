import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useRemoveFriendMutation = () => {
  const queryClient = useQueryClient();

  async function removeFriend({ friendId }) {
    const removeFriend = httpsCallable(functions, "removeFriend");
    return await removeFriend({ friendId });
  }

  const mutation = useMutation(removeFriend, {
    onSuccess: () => {
      queryClient.invalidateQueries("friend");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
};

export default useRemoveFriendMutation;
