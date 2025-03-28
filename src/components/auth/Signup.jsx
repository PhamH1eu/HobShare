import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { LoadingButton } from "@mui/lab";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../store/userStore";
import { UserService, ChatService } from "../../services/DatabaseService";
import uploadSpecificImage from "src/shared/helper/uploadAvatar";

import styled from "styled-components";
import { useQueryClient } from "react-query";
import {
  NotificationService,
  SavedService,
} from "src/services/SubDatabaseService";

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
  margin-bottom: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  text-decoration: underline;

  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    object-fit: cover;
    opacity: 0.6;
  }
`;

const Signup = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const mutationSignUp = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      toast.error(error.message);
    },
  });

  const setUserId = useUserStore((state) => state.setUserId);
  const setSignedUp = useUserStore((state) => state.setSignedUp);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      // @ts-ignore
      const { username, email, password } = Object.fromEntries(formData);

      //validate data
      if (!username || !email || !password) {
        throw new Error("Please fill in all fields");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      if (!avatar.file) {
        throw new Error("Please upload an image");
      }

      //write to firebase
      const res = await mutationSignUp.mutateAsync({ email, password });

      const avatarUrl = await uploadSpecificImage(
        avatar.file,
        res.user.uid,
        "avatar.jpg"
      );

      const imageUrl = `/background.png`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const wallpaper = new File([blob], "/background.png", {
        type: blob.type,
      });

      const wallpaperUrl = await uploadSpecificImage(
        wallpaper,
        res.user.uid,
        "wallpaper.jpg"
      );

      await Promise.all([
        UserService.create(
          {
            username,
            email,
            avatar: avatarUrl,
            wallpaper: wallpaperUrl,
            id: res.user.uid,
            blocked: [],
          },
          res.user.uid
        ),
        SavedService.createSubCollection(res.user.uid, {}),
        NotificationService.createSubCollection(res.user.uid, {
          unreadNotis: 0,
        }),
        ChatService.create(
          {
            id: res.user.uid,
          },
          res.user.uid
        ),
      ]);

      setUserId(res.user.uid);
      setSignedUp(true);
      queryClient.refetchQueries("user");
      toast.success("Tạo tài khoản thành công");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <Form className="signup" onSubmit={handleRegister}>
      <Title>Sign Up</Title>
      <Label htmlFor="file">
        <img src={avatar.url || "./avatar.png"} alt="avatar" />
        Upload an image
      </Label>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleAvatar}
      />
      <Input
        type="text"
        name="username"
        id="usernameId"
        placeholder="Username"
      />

      <Input type="email" name="email" id="emailId" placeholder="Email" />
      <Input
        type="password"
        name="password"
        id="passwordId"
        placeholder="Password"
      />
      <Link href="#">Already have an Account?</Link>
      <LoadingButton
        type="submit"
        loading={mutationSignUp.isLoading || loading}
        variant="outlined"
      >
        Sign Up
      </LoadingButton>
    </Form>
  );
};

export default Signup;
