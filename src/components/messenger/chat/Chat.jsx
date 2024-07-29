import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import InfiniteScroll from "react-infinite-scroller";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useInView } from "react-intersection-observer";
import CancelIcon from "@mui/icons-material/Cancel";
import { useUserStore } from "src/store/userStore";
import { useChatStore } from "src/store/chatStore";
import { useInfoShowStore } from "src/store/infoShowStore";
import { useListenChat } from "src/hooks/useListenChat";
import { loadMoreMessages } from "src/hooks/useListenChat";
import UpdateChat from "src/services/UpdateChat";
import SendMessage from "src/services/SendMessage";
import CircularLoading from "src/shared/components/Loading";
import "./chat.css";

export const Chat = () => {
  //local states
  const { ref, inView, entry } = useInView();
  const scrollDown = useCallback(() => {
    entry.target.scrollIntoView({ behavior: "smooth" });
  }, [entry]);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [imgList, setImgList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const showInfo = useInfoShowStore((state) => state.showInfo);

  //load more messages states
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserStore();
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    message,
    setMessage,
    setNewMessage,
  } = useChatStore();
  useEffect(() => {
    if (inView) scrollDown();
  }, [message, inView, scrollDown]);

  //khi chatID thay đổi(bằng cách bấm chat với ng khác) => lấy dữ liệu chat từ db && lắng nghe sự thay đổi
  useListenChat(chatId, setNewMessage, setMessage, setLastMessageTimestamp);
  useEffect(() => {
    setHasMore(true);
    setLastMessageTimestamp(null);
  }, [chatId]);

  const handleEmoji = (e) => {
    setText(text + e.emoji);
    setOpen(false);
  };

  //add video more
  const handleImg = (e) => {
    const file = {
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    };
    //check if file is image or video
    if (e.target.files[0].type.includes("image")) {
      setImgList([...imgList, file]);
    } else {
      setVideoList([...videoList, file]);
    }
    e.target.value = null;
  };

  function deleteImg(location, type) {
    //handle video
    if (type === "video") {
      setVideoList((videoList) =>
        videoList.filter((item, index) => index !== location)
      );
      return;
    }
    setImgList((imgList) =>
      imgList.filter((item, index) => index !== location)
    );
  }

  const handleSend = async () => {
    await Promise.all([
      //pass video list
      SendMessage(currentUser, chatId, text, imgList, videoList),
      UpdateChat(currentUser, user.id, chatId, text),
    ]);
    setImgList([]);
    setVideoList([]);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  function load() {
    if (loading) return;
    if (!lastMessageTimestamp) return;
    loadMoreMessages(
      chatId,
      lastMessageTimestamp,
      setLastMessageTimestamp,
      message,
      setMessage,
      setHasMore,
      setLoading
    );
  }

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
          <button onClick={showInfo}>
            <img src="./info.png" alt="" />
          </button>
        </div>
      </div>
      <div className="center">
        <InfiniteScroll
          loadMore={() => load()}
          hasMore={hasMore}
          isReverse={true}
          loader={<CircularLoading key={0} />}
          useWindow={false}
        >
          {message?.map((mess, index) => {
            return (
              <div
                className={
                  mess.senderId === currentUser?.id ? "message own" : "message"
                }
                key={index}
              >
                <div className="texts">
                  {mess.img &&
                    mess.img.map((image, index) => {
                      return <img src={image} key={index} alt="" />;
                    })}

                  {mess.video &&
                    mess.video.map((video, index) => {
                      return (
                        <video controls key={index}>
                          <source src={video} type="video/mp4" />
                        </video>
                      );
                    })}

                  {mess.text != "" && <p>{mess.text}</p>}
                  {index == message.length - 1 && (
                    <span>
                      {format(mess.sendAt?.toDate() ?? new Date(), "dd MMM")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
        <div ref={ref}></div>
        {!inView && (
          <IconButton
            color="info"
            size="large"
            onClick={() => scrollDown()}
            aria-label="hs"
          >
            <KeyboardDoubleArrowDownIcon fontSize="inherit" />
          </IconButton>
        )}
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
          {videoList.map(function (video, index) {
            return (
              <div className="video-wrapper" key={index}>
                <video controls>
                  <source src={video.url} type="video/mp4" />
                </video>
                <div
                  className="delete"
                  onClick={() => deleteImg(index, "video")}
                >
                  <CancelIcon />
                </div>
              </div>
            );
          })}
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
            onKeyDown={handleKeyPress}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <div className="emoji">
            <img src="./emoji.png" alt="" onClick={() => setOpen(!open)} />
            <div className="picker">
              <EmojiPicker
                open={open}
                onEmojiClick={handleEmoji}
                style={{ zIndex: 2 }}
              />
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
