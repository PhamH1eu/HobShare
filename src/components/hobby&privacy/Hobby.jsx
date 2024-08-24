import { useState } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import useActivities from "src/shared/hooks/fetch/useActivities";

import { useUserStore } from "src/store/userStore";
import { UserService } from "src/services/DatabaseService";
import { geohashForLocation } from "geofire-common";
import useModal from "src/shared/hooks/util/useModal";

import "./index.css";
import CircularLoading from "src/shared/components/Loading";

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

const transition = transitions.scaleDown;

const HobbyChoosingPage = () => {
  const setSignedUp = useUserStore((state) => state.setSignedUp);
  const currentUserId = useUserStore((state) => state.currentUserId);

  const { activities, isLoading } = useActivities();

  const [liked, setLiked] = useState([]);
  const addHobby = (obj) => {
    if (liked.some((x) => x.caption === obj.caption)) {
      setLiked(liked.filter((x) => x.caption !== obj.caption));
    } else {
      setLiked([...liked, obj]);
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
    UserService.update(currentUserId, {
      favorite: [...liked],
      location: {
        ...location,
        denyExposingLocation: deny,
        geohash: deny
          ? null
          : geohashForLocation([location.latitude, location.longitude]),
      },
    });
    setSignedUp(false);
  };

  const { open, handleOpen, handleClose } = useModal();

  if (isLoading) return <CircularLoading />;

  return (
    <>
      <div className="hobby">
        <div className="current">
          <h2>Hoạt động bạn đã thích</h2>
          {[...liked].map((item, index) => (
            <div className="button" key={index}>
              {item.caption}
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
          columnWidth={250}
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
          {activities.map((obj) => (
            <figure
              key={obj.id}
              // @ts-ignore
              className={`image ${
                // @ts-ignore
                liked.some((x) => x.caption === obj.caption) ? `selected` : ``
              }`}
              // @ts-ignore
              onClick={() => addHobby(obj)}
            >
              {liked.some(
                (x) =>
                  x.caption ===
                  // @ts-ignore
                  obj.caption
              ) ? (
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              ) : null}
              <img
                src={
                  // @ts-ignore
                  obj.image
                }
                // @ts-ignore
                alt={obj.caption}
              />
              <figcaption>
                {
                  // @ts-ignore
                  obj.caption
                }
              </figcaption>
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
            <span>
              Nếu bạn từ chối, vui lòng bật lại theo hướng dẫn tại
            </span>{" "}
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
