import CircularLoading from "src/shared/components/Loading";
import Post from "src/components/home/NewsFeed/component/Post";
import usePosts from "src/shared/hooks/fetch/usePosts";
import { Typography } from "@mui/material";

const GroupNewsFeed = () => {
  const { posts, isLoading } = usePosts();

  return (
    <>
      <Typography variant="h6">Hoạt động gần đây</Typography>
      {isLoading ? (
        <CircularLoading />
      ) : (
        <div>
          {posts.map((post, index) => (
            // @ts-ignore
            <Post key={index} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default GroupNewsFeed;