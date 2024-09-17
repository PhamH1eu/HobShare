import NewPostInput from "./new_post/NewPostInput";
import Post from "./component/Post";
import FriendsRecommend from "./FriendsRecommend";
import styled from "styled-components";

import usePosts from "src/shared/hooks/fetch/post/usePosts";
import CircularLoading from "src/shared/components/Loading";

const NewFeed = styled.div`
  flex: 2;
  .posts {
    display: flex;
    flex-direction: column;
  }
  margin-right: 80px;
  margin-left: 80px;
`;

const NewsFeed = () => {
  const { posts, isLoading } = usePosts();

  return (
    <NewFeed>
      <FriendsRecommend />
      <NewPostInput groupId={undefined} groupName={undefined} groupWallpaper={undefined} />
      {isLoading ? (
        <CircularLoading />
      ) : (
        <div>
          {posts.map((post, index) => (
            // @ts-ignore
            <Post key={index} postId={post.id} />
          ))}
        </div>
      )}
    </NewFeed>
  );
};

export default NewsFeed;
