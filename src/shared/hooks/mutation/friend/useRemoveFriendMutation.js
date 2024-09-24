import { useMutation, useQueryClient } from "react-query";
import { functions } from "src/lib/firebase";
import { httpsCallable } from "firebase/functions";

const useRemoveFriendMutation = () => {
  const queryClient = useQueryClient();

  async function removeFriend({ friendId }) {
    const removeFriend = httpsCallable(functions, "removeFriend");
    removeFriend({ friendId })
      .then((result) => {
        console.log(result.data); // Friend request sent
      })
      .catch((error) => {
        console.error("Error sending friend request:", error.message);
      });
  }

  const mutation = useMutation(removeFriend, {
    onSuccess: () => {
      queryClient.invalidateQueries("friend");
    },
  });

  return mutation;
};

export default useRemoveFriendMutation;
