import Post from "src/components/home/NewsFeed/component/Post";

const posts = [];

const OnlyFriendPosts = () => {
  return (
    <div style={{ marginLeft: "80px", marginRight: "80px" }}>
      {posts.map((post, index) => (
        <Post key={index} postId={post.id} />
      ))}
    </div>
  );
};

export default OnlyFriendPosts;
