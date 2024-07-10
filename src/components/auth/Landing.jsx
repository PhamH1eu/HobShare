import { Login } from "./Login";
import { Signup } from "./Signup";
import "./login.css";

export const Landing = () => {
  return (
    <div className="landing">
      <Login />
      <div className="separator"></div>
      <Signup />
    </div>
  );
};
