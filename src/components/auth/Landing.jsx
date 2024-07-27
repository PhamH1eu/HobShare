import { Login } from "./Login";
import { Signup } from "./Signup";
import { useListenAuth } from "src/hooks/useListenAuth";
import "./login.css";

export const Landing = () => {
  useListenAuth();
  
  return (
    <div className="landing">
      <Login />
      <div className="separator"></div>
      <Signup />
    </div>
  );
};
