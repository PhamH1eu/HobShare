import { useState } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { useUserStore } from "src/store/userStore";
import { UserService } from "src/services/DatabaseService";
import { geohashForLocation } from "geofire-common";
import useModal from "src/hooks/useModal";

import "./index.css";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 10,
};

const images = [
  { src: "/photos/photo01.jpg", label: "Sample image 1" },
  { src: "/photos/photo02.jpg", label: "Sample image 2" },
  { src: "/photos/photo03.jpg", label: "Sample image 3" },
  { src: "/photos/photo04.jpg", label: "Sample image 4" },
  { src: "/photos/photo05.jpg", label: "Sample image 5" },
  { src: "/photos/photo06.jpg", label: "Sample image 6" },
  { src: "/photos/photo07.jpg", label: "Sample image 7" },
  { src: "/photos/photo08.jpg", label: "Sample image 8" },
  { src: "/photos/photo09.jpg", label: "Sample image 9" },
  { src: "/photos/photo10.jpg", label: "Sample image 10" },
  { src: "/photos/photo11.jpg", label: "Sample image 11" },
  { src: "/photos/photo12.jpg", label: "Sample image 12" },
  { src: "/photos/photo13.jpg", label: "Sample image 13" },
  { src: "/photos/photo14.jpg", label: "Sample image 14" },
  { src: "/photos/photo15.jpg", label: "Sample image 15" },
  { src: "/photos/photo16.jpg", label: "Sample image 16" },
  { src: "/photos/photo17.jpg", label: "Sample image 17" },
  { src: "/photos/photo18.jpg", label: "Sample image 18" },
  { src: "/photos/photo19.jpg", label: "Sample image 19" },
  { src: "/photos/photo20.jpg", label: "Sample image 20" },
  { src: "/photos/photo21.jpg", label: "Sample image 21" },
  { src: "/photos/photo22.jpg", label: "Sample image 22" },
];

const transition = transitions.scaleDown;

const HobbyChoosingPage = () => {
  const setSignedUp = useUserStore((state) => state.setSignedUp);
  const currentUser = useUserStore((state) => state.currentUser);

  const [liked, setLiked] = useState(new Set());
  const addHobby = (label) => {
    if (liked.has(label)) {
      setLiked((prev) => new Set([prev].filter((x) => x !== label)));
    } else {
      setLiked((prev) => new Set([prev, label]));
    }
  };

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [deny, setDeny] = useState(false);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setDeny(false);
        },
        // eslint-disable-next-line no-unused-vars
        (_error) => {
          setDeny(true);
        }
      );
    } else {
      setDeny(true);
    }
  };

  const writeHobby = () => {
    UserService.update(currentUser.id, {
      liked: [liked],
      location: {
        ...location,
        geohash: deny ? null : geohashForLocation([location.latitude, location.longitude]),
      },
      denyExposingLocation: deny,
    });
    setSignedUp(false);
  };

  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <div className="hobby">
        <div className="current">
          <h2>Hoạt động bạn đã thích</h2>
          {[liked].map((item, index) => (
            <div className="button" key={index}>
              {item}
            </div>
          ))}
          <button
            className="button"
            onClick={() => {
              handleOpen();
              getLocation();
            }}
          >
            Tiếp tục
          </button>
        </div>
        <StackGrid
          monitorImagesLoaded
          columnWidth={270}
          duration={600}
          gutterWidth={15}
          gutterHeight={10}
          easing={easings.cubicOut}
          appearDelay={60}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
          style={{ width: "100vw" }}
        >
          {images.map((obj) => (
            <figure
              key={obj.src}
              className={`image ${liked.has(obj.label) ? `selected` : ``}`}
              onClick={() => addHobby(obj.label)}
            >
              {liked.has(obj.label) ? (
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              ) : null}
              <img src={obj.src} alt={obj.label} />
              <figcaption>{obj.label}</figcaption>
            </figure>
          ))}
        </StackGrid>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="privacy-content">
            <h2>Chính sách bảo mật</h2>
            <p className="info">
              Để cung cấp trải nghiệm tốt nhất, chúng tôi sẽ thu thập và sử dụng
              vị trí của bạn. Bằng cách nhấn vào nút{" "}
              <span style={{ color: "#3a78e7", cursor: "pointer" }}>
                TIẾP TỤC{" "}
              </span>
              dưới đây, bạn đồng ý với chính sách bảo mật của chúng tôi.
              <br />1 vài tính năng có thể không hiện hữu nếu bạn bỏ qua bước
              này.
            </p>
            <div className="action">
              <Button
                variant="contained"
                className="button"
                onClick={writeHobby}
              >
                Tiếp tục
              </Button>
            </div>
            <p className="note">(Cài đặt này có thể tuỳ chỉnh sau)</p>
            <span>Nếu bạn từ chối, vui lòng bật lại theo hướng dẫn tại</span>{" "}
            <a href="https://support.google.com/chrome/answer/142065?hl=en">
              Chrome Location Guide
            </a>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HobbyChoosingPage;
