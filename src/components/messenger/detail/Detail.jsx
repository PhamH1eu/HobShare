import { useChatStore } from "src/store/chatStore";
import { useInfoShowStore } from "src/store/infoShowStore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircularLoading from "src/shared/components/Loading";
import "./detail.css";
import useListenOnline from "src/shared/hooks/listen/useListenOnline";

export const Detail = () => {
  const {
    user,
    message,
  } = useChatStore();
  
  const { online, timeOff } = useListenOnline(user.receiverId);

  const isShow = useInfoShowStore((state) => state.isShow);

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

  if (!message && isShow)
    return (
      <div style={{ flex: 1 }}>
        <CircularLoading />
      </div>
    );

  return isShow ? (
    <div className="detail">
      <div className="user">
        <img src={user?.receiverAvatar || "./avatar.png"} alt="" />
        <h2>{user?.receiverName}</h2>
        <h3 style={{ fontWeight: "500", color: "#7d7e81" }}>
          {!timeOff
            ? "Đã lâu không hoạt động"
            : online
            ? "Đang hoạt động"
            : `Hoạt động ${timeOff} trước`}
        </h3>
      </div>
      <div className="info">
        <div className="option">
          <Accordion defaultExpanded>
            <AccordionSummary
              style={{ padding: "0", fontWeight: "500" }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <div className="title">
                <span>Đa phương tiện</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="photos">
                {extractMediaUrls(message).map((media, index) => {
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
      </div>
    </div>
  ) : null;
};
