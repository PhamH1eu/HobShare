import { useState } from "react";
import { useListenChat } from "src/hooks/useListenChat";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../store/chatStore";
import { useUserStore } from "../../store/userStore";
import { useInfoShowStore } from "src/store/infoShowStore";
import BlockUser from "src/services/BlockUser";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircularLoading from "src/shared/components/Loading";
import "./detail.css";

export const Detail = () => {
  const {
    user,
    chatId,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const [chat, setChat] = useState();
  useListenChat(chatId, setChat);

  const { currentUser } = useUserStore();
  const isShow = useInfoShowStore((state) => state.isShow);

  const handleBlock = async () => {
    BlockUser(user, isReceiverBlocked, currentUser);
    changeBlock();
  };

  const logout = () => {
    auth.signOut();
    resetChat();
  };

  function extractMediaUrls(data) {
    const urls = [];

    data.forEach((message) => {
      if (message.img && Array.isArray(message.img)) {
        message.img.forEach((imgUrl) => {
          urls.push({ url: imgUrl, type: "img" });
        });
      }
      if (message.video && Array.isArray(message.video)) {
        message.video.forEach((videoUrl) => {
          urls.push({ url: videoUrl, type: "video" });
        });
      }
    });

    return urls;
  }

  if (!chat && isShow) return <div style={{flex: 1}}><CircularLoading/></div>

  return isShow ? (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <Accordion defaultExpanded>
            <AccordionSummary
              style={{ padding: "0", color: "white" }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <div className="title">
                <span>Privacy & Help</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <button onClick={handleBlock}>
                {isCurrentUserBlocked
                  ? "You are blocked"
                  : isReceiverBlocked
                  ? "User blocked"
                  : "Block User"}
              </button>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="option">
          <Accordion defaultExpanded>
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
                {extractMediaUrls(chat).map((media, index) => {
                  return (
                    <div className="photoItem" key={index}>
                      <div className="photoDetail">
                        {media.type === "img" ? (
                          <img src={media.url} alt="" />
                        ) : (
                          <video controls>
                            <source src={media.url} type="video/mp4" />
                          </video>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  ) : null;
};
