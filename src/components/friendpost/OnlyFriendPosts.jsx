import Post from "src/components/home/NewsFeed/component/Post";
import CircularLoading from "src/shared/components/Loading";
import useFriendsPosts from "src/shared/hooks/fetch/friend/useFriendPost";

const OnlyFriendPosts = () => {
  const { posts, isLoading } = useFriendsPosts();

  if (isLoading) {
    return (
      <div style={{ marginLeft: "80px", marginRight: "80px" }}>
        <CircularLoading />
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "80px", marginRight: "80px" }}>
      {posts.map((post, index) => (
        <Post
          key={index}
          postId={post}
          initComt={undefined}
          isAdminGroup={undefined}
        />
      ))}
    </div>
  );
};

export default OnlyFriendPosts;
