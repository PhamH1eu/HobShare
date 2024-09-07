import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "src/lib/firebase";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

import styled from "styled-components";

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const Login = () => {
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
        throw new Error("Vui lòng nhập đầy đủ thông tin");
      }

      //write to firebase
      mutationLogin.mutate({ email, password });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form className="signin" onSubmit={handleLogin}>
      <Title>Sign In</Title>
      <Input type="email" name="email" id="emailId" placeholder="Email" />
      <Input
        type="password"
        name="password"
        id="passwordId"
        placeholder="Password"
      />
      <Link href="#">Forgot Your Password?</Link>
      <LoadingButton
        type="submit"
        loading={mutationLogin.isLoading}
        variant="outlined"
      >
        Sign In
      </LoadingButton>
    </Form>
  );
};

export default Login;