import { Toaster } from "react-hot-toast";
import "./noti.css";

const AppNoti = () => {
  return (
    <Toaster
      position="bottom-left"
      containerStyle={{
        left: 50,
        bottom: 50,
      }}
      containerClassName="noti123"
      toastOptions={{
        duration: 10000,
        style: {
          padding: 0,
          margin: 0,
        },
      }}
    />
  );
};

export default AppNoti;
