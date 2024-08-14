import styled from "styled-components";
import StyledLink from "../StyledLink";
import {
  Box,
  Avatar,
  IconButton,
  InputBase,
  styled as MuiStyled,
} from "@mui/material";
import { EmojiEmotions, Send } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CircularLoading from "../Loading";
import CancelIcon from "@mui/icons-material/Cancel";
import "./chatdialog.css";

import InfiniteScroll from "react-infinite-scroller";
import { useUserStore } from "src/store/userStore";
import { useChatDialogStore } from "src/store/chatDialogStore";
import { useListenChat } from "src/hooks/useListenChat";
import { loadMoreMessages } from "src/hooks/useListenChat";
import { useCallback, useEffect, useState } from "react";
import SendMessage from "src/services/SendMessage";
import UpdateChat from "src/services/UpdateChat";
import EmojiPicker from "emoji-picker-react";
import { useInView } from "react-intersection-observer";

const Wrapper = styled.div`
  width: 320px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Header = MuiStyled(Box)`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;

  & a:hover {
    border-radius: 5px;
    background-color: #f0f0f0;
  }
`;

const MessageContainer = MuiStyled(Box)`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  height: 340px;
`;

const MessageWithAvatar = MuiStyled(Box)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  ${(props) =>
    // @ts-ignore
    props.position === "right"
      ? "justify-content: flex-end;"
      : "justify-content: flex-start;"}
`;

const MessWrapper = MuiStyled(Box)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  ${(props) =>
    // @ts-ignore
    props.position === "right"
      ? "justify-content: flex-end;"
      : "justify-content: flex-start;"}
`;

const MessageText = MuiStyled(Box)`
  background-color: ${(props) =>
    // @ts-ignore
    props.position === "right" ? "#99EA56" : "#f0f0f0"};

  color: #000;
  padding: 6px 12px;
  font-size: 15px;
  border-radius: 18px;
  word-break: break-word;
`;

const MediaMessage = styled(Box)`
  max-width: 100%;
  ${(props) =>
    // @ts-ignore
    props.position === "right"
      ? "border-bottom-right-radius: 0;"
      : "border-bottom-left-radius: 0;"}
  img, video {
    border-radius: 12px;
    max-width: 100%;
    height: auto;
  }
  overflow: hidden;
  border-radius: 12px;
`;

const InputContainer = MuiStyled(Box)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
`;

const CustomInput = MuiStyled(InputBase)`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 10px;
`;

const ChatDialog = ({ chat }) => {
  const { ref, inView, entry } = useInView();
  console.log("🚀 ~ ChatDialog ~ inView:", inView);
  const scrollDown = useCallback(() => {
    entry.target.scrollIntoView({ behavior: "smooth" });
  }, [entry]);

  const { minimizeChat, removeOpenChat } = useChatDialogStore();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [imgList, setImgList] = useState([]);
  const [videoList, setVideoList] = useState([]);

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

  const { currentUser } = useUserStore();
  const { chatId, user } = chat;

  const isBlocking =
    user.blocked.includes(currentUser.id) ||
    currentUser.blocked.includes(user.id);

  const [messages, setMessages] = useState([]);

  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useListenChat(chatId, setMessages, setLastMessageTimestamp, setHasMore);

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

  useEffect(() => {
    if (inView) scrollDown();
  }, [messages, inView, scrollDown]);

  return (
    <Wrapper>
      <Header>
        <Avatar src={chat.user.avatar} />
        <StyledLink to="/profile/5">
          <Box sx={{ marginLeft: 1, cursor: "pointer", paddingRight: "5px" }}>
            <Box fontWeight="bold">{chat.user.username}</Box>
            <Box fontSize="small" color="gray">
              Hoạt động 31 phút trước
            </Box>
          </Box>
        </StyledLink>
        <Box sx={{ marginLeft: "auto", display: "flex" }}>
          <IconButton color="primary" onClick={() => minimizeChat(chat)}>
            <RemoveIcon color="primary" />
          </IconButton>
          <IconButton color="primary" onClick={() => removeOpenChat(chat)}>
            <ClearIcon color="primary" />
          </IconButton>
        </Box>
      </Header>
      <MessageContainer>
        <InfiniteScroll
          loadMore={() => load()}
          hasMore={hasMore}
          isReverse={true}
          loader={<CircularLoading key={0} />}
          useWindow={false}
        >
          {messages.map((message, index) => {
            const position =
              message.senderId === currentUser.id ? "right" : "left";
            return (
              <MessageWithAvatar
                key={index}
                // @ts-ignore
                position={position}
              >
                {message.senderId !== currentUser.id && (
                  <Avatar src={message.senderAvatar} sx={{ marginRight: 1 }} />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "60%",
                    gap: "5px",
                  }}
                >
                  {message.text && (
                    <MessageText
                      // @ts-ignore
                      position={position}
                    >
                      {message.text}
                    </MessageText>
                  )}
                  {message.img?.map((img, index) => (
                    <MediaMessage position={message.position} key={index}>
                      <img src={img} alt="Sent media" />
                    </MediaMessage>
                  ))}
                  {message.video?.map((video, index) => (
                    <MediaMessage position={message.position} key={index}>
                      <video controls>
                        <source src={video} type="video/mp4" />
                      </video>
                    </MediaMessage>
                  ))}
                </div>
              </MessageWithAvatar>
            );
          })}
        </InfiniteScroll>
        <div ref={ref}></div>
      </MessageContainer>
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
              <div className="delete" onClick={() => deleteImg(index, "video")}>
                <CancelIcon />
              </div>
            </div>
          );
        })}
      </div>
      <InputContainer>
        <label htmlFor="file" style={{ cursor: "pointer", marginTop: "4px" }}>
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
        <IconButton color="primary" disabled={isBlocking}>
          <EmojiEmotions color="primary" onClick={() => setOpen(true)} />
          <div className="picker">
            <EmojiPicker
              open={open}
              onEmojiClick={handleEmoji}
              style={{ zIndex: 20000 }}
              width="300px"
            />
          </div>
        </IconButton>
        <CustomInput
          placeholder={isBlocking ? "Bạn đã bị chặn" : "Gửi tin nhắn..."}
          disabled={isBlocking}
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
        <IconButton color="primary" disabled={isBlocking} onClick={handleSend}>
          <Send color="primary" />
        </IconButton>
      </InputContainer>
    </Wrapper>
  );
};

export default ChatDialog;
