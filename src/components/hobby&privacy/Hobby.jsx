import { useState } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { IconButton } from "@mui/material";

import { useUserStore } from "src/store/userStore";
import { UserService } from "src/services/DatabaseService";

import "./index.css";

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
  const [showPrivacy, setShowPrivacy] = useState(false);

  const setSignedUp = useUserStore((state) => state.setSignedUp);
  const currentUser = useUserStore((state) => state.currentUser);
  const [liked, setLiked] = useState(new Set());
  const addHobby = (label) => {
    if (liked.has(label)) {
      setLiked((prev) => new Set([...prev].filter((x) => x !== label)));
    } else {
      setLiked((prev) => new Set([...prev, label]));
    }
  };

  const writeHobby = () => {
    UserService.update(currentUser.id, {
      liked: [...liked],
    });
    setSignedUp(false);
  };

  return showPrivacy ? (
    <div className="privacy">
        <div>aaa</div>
    </div>
  ) : (
    <div className="hobby">
      <div className="current">
        <h2>Hoạt động bạn đã thích</h2>
        {[...liked].map((item, index) => (
          <div className="button" key={index}>
            {item}
          </div>
        ))}
        <button className="button" onClick={() => setShowPrivacy(true)}>
          Tiếp tục
        </button>
      </div>
      <StackGrid
        monitorImagesLoaded
        columnWidth={280}
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
                <DoneOutlineIcon />
              </IconButton>
            ) : null}
            <img src={obj.src} alt={obj.label} />
            <figcaption>{obj.label}</figcaption>
          </figure>
        ))}
      </StackGrid>
    </div>
  );
};

export default HobbyChoosingPage;
