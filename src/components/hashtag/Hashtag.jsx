import CircularLoading from "src/shared/components/Loading";
import styled from "styled-components";
import Post from "../home/NewsFeed/component/Post";
import { useParams } from "react-router-dom";
import useQueryPosts from "src/shared/hooks/fetch/post/useQueryPosts";
import useHashtagInfo from "src/shared/hooks/fetch/hashtag/useHashtagInfo";

// Styled Components
const HashtagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
`;

const HashtagInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const HashtagTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const HashtagStats = styled.p`
  color: #5e5e5e;
  font-size: 1rem;
  margin-top: 5px;
`;

const PostWrapper = styled.div`
  width: 45%;
`;

const Hashtag = () => {
  const { hashtag } = useParams();
  const { hashtagInfo, isLoadingHashtag } = useHashtagInfo(`#${hashtag}`);
  const { posts, isLoading } = useQueryPosts(hashtag);

  if (isLoadingHashtag) return <CircularLoading />;

  return (
    <HashtagWrapper>
      <HashtagInfo>
        <HashtagTitle>{hashtagInfo.tag}</HashtagTitle>
        <HashtagStats>{hashtagInfo.postCount} bài viết</HashtagStats>
      </HashtagInfo>
      <PostWrapper>
        {isLoading ? (
          <CircularLoading />
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              initComt={undefined}
              isAdminGroup={undefined}
            />
          ))
        )}
      </PostWrapper>
    </HashtagWrapper>
  );
};

export default Hashtag;
