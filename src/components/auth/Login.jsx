import "./login.css";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { auth } from "../../lib/firebase";
import {
  useAuthSignInWithEmailAndPassword,
} from "@react-query-firebase/auth";

export const Login = () => {
  const mutationLogin = useAuthSignInWithEmailAndPassword(auth, {
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { email, password } = Object.fromEntries(formData);
      //validate data
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      //write to firebase
      mutationLogin.mutate({ email, password });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="item">
      <h2>Welcome back,</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <LoadingButton
          type="submit"
          loading={mutationLogin.isLoading}
          loadingPosition="start"
          variant="outlined"
        >
          Sign In
        </LoadingButton>
      </form>
    </div>
  );
};
