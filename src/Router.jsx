import { Routes, Route } from "react-router-dom";
import Home from "src/components/home/Home";
import Messenger from "src/components/messenger/Messenger";
import Notification from "src/shared/components/Notification";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
      <Notification />
    </>
  );
};

export default Router;
