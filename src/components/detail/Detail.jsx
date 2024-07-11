import { auth } from "../../lib/firebase";
import { useChatStore } from "../../store/chatStore";
import { useUserStore } from "../../store/userStore";
import BlockUser from "src/services/BlockUser";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./detail.css";

export const Detail = () => {
  const {
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    BlockUser(user, isReceiverBlocked, currentUser);
    changeBlock();
  };

  const logout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <Accordion>
            <AccordionSummary
              style={{ padding: "0", color: "white" }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <div className="title">
                <span>Chat Settings</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>123</AccordionDetails>
          </Accordion>
        </div>
        <div className="option">
          <Accordion>
            <AccordionSummary
              style={{ padding: "0", color: "white" }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <div className="title">
                <span>Privacy & Help</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>123</AccordionDetails>
          </Accordion>
        </div>
        <div className="option">
          <Accordion>
            <AccordionSummary
              style={{ padding: "0", color: "white" }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <div className="title">
                <span>Shared photos</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="photos">
                <div className="photoItem">
                  <div className="photoDetail">
                    <img
                      src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                      alt=""
                    />
                    <span>photo_2024_2.png</span>
                  </div>
                  <img src="./download.png" alt="" className="icon" />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
