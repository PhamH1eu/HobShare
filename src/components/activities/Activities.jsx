import { useState } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";

import useAllActivities from "src/shared/hooks/fetch/activity/useAllActivities";

import { useUserStore } from "src/store/userStore";
import { UserService } from "src/services/DatabaseService";

import "./index.css";
import CircularLoading from "src/shared/components/Loading";
import { LoadingButton } from "@mui/lab";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";

const transition = transitions.scaleDown;

const Activities = () => {
  const currentUserId = useUserStore((state) => state.currentUserId);
  const { data: currentUser } = useUserInfo(currentUserId);
  const [loading, setLoading] = useState(false);

  const { activities, isLoading } = useAllActivities();

  const [liked, setLiked] = useState([]);
  const addHobby = (obj) => {
    if (liked.some((x) => x.caption === obj.caption)) {
      setLiked(liked.filter((x) => x.caption !== obj.caption));
    } else {
      setLiked([...liked, obj]);
    }
  };

  const writeHobby = async () => {
    setLoading(true);
    await UserService.union(currentUserId, "favorite", liked);
    setLiked([]);
    setLoading(false);
  };

  if (isLoading)
    return (
      <div>
        <CircularLoading />
      </div>
    );

  const newActivities = activities.filter((item) =>
    !currentUser.favorite.some((x) => x.id === item.id)
  );
  console.log(currentUser.favorite, "-", activities);

  return (
    <div className="activity">
      <div className="top">
        <h2>Hoạt động bạn đã thích</h2>
        {[...liked].map((item, index) => (
          <div className="button" key={index}>
            {item.caption}
          </div>
        ))}
        <LoadingButton loading={loading} onClick={writeHobby}>
          Xác nhận
        </LoadingButton>
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
        {newActivities.map((obj) => (
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
  );
};

export default Activities;
