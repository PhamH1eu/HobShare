import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
      <ToastContainer
        position="bottom-right"
        style={{ fontSize: "14px", zIndex: 10000 }}
      />
  );
};

export default Notification;
