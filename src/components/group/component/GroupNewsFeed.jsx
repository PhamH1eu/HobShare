import CircularLoading from "src/shared/components/Loading";
import Post from "src/components/home/NewsFeed/component/Post";
import usePosts from "src/shared/hooks/fetch/usePosts";
import { Typography } from "@mui/material";

const GroupNewsFeed = () => {
  const { posts, isLoading } = usePosts();

  return (
    <div style={{ padding: "0 200px", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ fontSize: "0.95rem", color: "#656b7c" }}>
        Hoạt động gần đây
      </Typography>
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
    </div>
  );
};

export default GroupNewsFeed;
