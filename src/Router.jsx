import { Routes, Route } from "react-router-dom";
import Home from "src/components/home/Home";
import Messenger from "src/components/messenger/Messenger";
import NavBar from "./shared/components/Navbar";

const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </>
  );
};

export default Router;
