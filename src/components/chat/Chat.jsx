import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useUserStore } from "../../store/userStore";
import { useChatStore } from "../../store/chatStore";
import { useListenChat } from "src/hooks/useListenChat";
import UpdateChat from "src/services/UpdateChat";
import SendMessage from "src/services/SendMessage";
import "./chat.css";

export const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [imgList, setImgList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  //khi chatID thay đổi(bằng cách bấm chat với ng khác) => lấy dữ liệu chat từ db && lắng nghe sự thay đổi
  useListenChat(chatId, setChat);

  const handleEmoji = (e) => {
    setText(text + e.emoji);
    setOpen(false);
  };

  //add video more
  const handleImg = (e) => {
    //handle video type?

    if (e.target.files[0]) {
      setImgList([
        ...imgList,
        {
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0]),
        },
      ]);
      e.target.value = null;
    }
  };

  function deleteImg(location) {
    //handle video
    setImgList((imgList) =>
      imgList.filter((item, index) => index !== location)
    );
  }

  const handleSend = async () => {
    await Promise.all([
      //pass video list
      SendMessage(currentUser, chatId, text, imgList),
      UpdateChat(currentUser, user.id, chatId, text),
    ]);
    setImgList([]);
    setText("");
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id ? "message own" : "message"
            }
            key={message?.createdAt}
          >
            <div className="texts">
              {/* {message.img && <img src={message.img} alt="" />} */}
              {message.img &&
                message.img.map((image, index) => {
                  <img src={image} key={index} alt="" />;
                })}

              {message.text != "" && <p>{message.text}</p>}
              <span>{format(message.createdAt.toDate(), "dd MMM")}</span>
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>

      <div className="bottom-wrapper">
        <div className="preview">
          {imgList.map(function (img, index) {
            return (
              <div className="img-wrapper" key={img.url}>
                <img src={img.url} alt="" />
                <div className="delete" onClick={() => deleteImg(index)}>
                  <CancelIcon />
                </div>
              </div>
            );
          })}
          <div className="video-wrapper">
            <video
              src="https://ik.imagekit.io/ikmedia/example_video.mp4"
              controls
            />
            <div className="delete">
              <CancelIcon />
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="icons">
            <label htmlFor="file">
              <img src="./img.png" alt="" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImg}
            />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
          </div>
          <input
            type="text"
            placeholder={
              isCurrentUserBlocked || isReceiverBlocked
                ? "You cannot send a message"
                : "Type a message..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPasteCapture={(e) => {
              setImgList([
                ...imgList,
                {
                  file: e.clipboardData.files[0],
                  url: URL.createObjectURL(e.clipboardData.files[0]),
                },
              ]);
            }}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <div className="emoji">
            <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button
            className="sendButton"
            disabled={isCurrentUserBlocked || isReceiverBlocked}
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
