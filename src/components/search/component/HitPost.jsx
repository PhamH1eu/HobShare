import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import Post from "src/components/home/NewsFeed/component/Post";

export const HitPost = ({ hit }) => {
  return (
    <Post
      postId={getPropertyByPath(hit, "objectID")}
      initComt={undefined}
      isAdminGroup={undefined}
    />
  );
};
