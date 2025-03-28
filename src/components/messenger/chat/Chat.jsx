import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import InfiniteScroll from "react-infinite-scroller";
import IconButton from "@mui/material/IconButton";
import { useInView } from "react-intersection-observer";
import StyledLink from "src/shared/components/StyledLink";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import { useUserStore } from "src/store/userStore";
import { useChatStore } from "src/store/chatStore";
import { useInfoShowStore } from "src/store/infoShowStore";
import { useListenChat } from "src/shared/hooks/listen/useListenChat";
import { loadMoreMessages } from "src/shared/hooks/listen/useListenChat";

import UpdateChat from "src/services/chat/UpdateChat";
import SendMessage from "src/services/chat/SendMessage";
import CircularLoading from "src/shared/components/Loading";
import "./chat.css";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";
import { Box } from "@mui/material";

import { styled as MuiStyled } from "@mui/material";
import { vi } from "date-fns/locale/vi";

const SharedMessage = MuiStyled(Box)`
  color: #000;
  border-radius: 12px;
  word-break: break-word;
  padding-bottom: 5px;

  img, video {
    border-radius: 12px 12px 0 0 !important;
    margin-top: 0 !important;
    max-width: 100%;
    height: auto;
  }

  div {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

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

  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);
  const {
    chatId,
    user,
    setMessages: setMessageStore,
  } = useChatStore();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([]);
  }, [chatId]);
  useEffect(() => {
    setMessageStore(messages);
  }, [messages]);
  useEffect(() => {
    if (inView) scrollDown();
  }, [messages, inView, scrollDown]);

  //khi chatID thay đổi(bằng cách bấm chat với ng khác) => lấy dữ liệu chat từ db && lắng nghe sự thay đổi
  useListenChat(chatId, setMessages, setLastMessageTimestamp, setHasMore);
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
        // @ts-ignore
        videoList.filter((item, index) => index !== location)
      );
      return;
    }
    setImgList((imgList) =>
      // @ts-ignore
      imgList.filter((item, index) => index !== location)
    );
  }

  const handleSend = async () => {
    setImgList([]);
    setVideoList([]);
    setText("");
    await Promise.all([
      //pass video list
      SendMessage(currentUser, chatId, text, imgList, videoList),
      UpdateChat(currentUserId, user.receiverId, chatId, text),
    ]);
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
      messages,
      setMessages,
      setHasMore,
      setLoading
    );
  }

  return (
    <div className="chat">
      <div className="top">
        <StyledLink to={"/profile/" + user.receiverId}>
          <div className="user">
            <img src={user?.receiverAvatar || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{user?.receiverName}</span>
            </div>
          </div>
        </StyledLink>
        <div className="icons">
          <button onClick={showInfo}>
            <InfoIcon
              // @ts-ignore
              color="primary"
            />
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
          {messages?.map((mess, index) => {
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

                  {mess.postShared && (
                    <StyledLink to={`/post/${mess.postShared.id}`}>
                      <SharedMessage
                        className="shared-message"
                        // @ts-ignore
                      >
                        {mess.postShared.img && (
                          <img src={mess.postShared.img} alt="Shared media" />
                        )}
                        {mess.postShared.video && (
                          <video controls>
                            <source
                              src={mess.postShared.video}
                              type="video/mp4"
                            />
                          </video>
                        )}
                        {mess.postShared.text && (
                          <Box fontSize="0.9rem" paddingTop="5px">
                            {mess.postShared.text}
                          </Box>
                        )}
                        <Box fontWeight="bold" fontSize="1.05rem">
                          {mess.postShared.author}
                        </Box>
                      </SharedMessage>
                    </StyledLink>
                  )}

                  {index == messages.length - 1 && (
                    <span>
                      {format(
                        mess.sendAt?.toDate() ?? new Date(),
                        "HH:mm dd MMMM",
                        {
                          locale: vi,
                        }
                      )}
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
            <KeyboardDoubleArrowDownIcon
              fontSize="inherit"
              // @ts-ignore
              color="white"
            />
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
              <ImageIcon
                // @ts-ignore
                color="primary"
              />
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
            placeholder="Gửi tin nhắn..."
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
          />
          <div className="emoji">
            <SentimentSatisfiedAltIcon
              onClick={() => setOpen(!open)}
              // @ts-ignore
              color="primary"
            />
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
            onClick={handleSend}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
