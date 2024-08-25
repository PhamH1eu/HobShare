import { useParams } from "react-router-dom";
import Post from "./component/Post";
import useSinglePost from "src/shared/hooks/fetch/useSinglePost";
import styled from "styled-components";
import CircularLoading from "src/shared/components/Loading";

const PostPageContainer = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;

  div {
    max-width: 600px;
    height: fit-content;
  }
`;

const PostPage = () => {
  const { postId } = useParams();
  const { post, isLoading } = useSinglePost(postId);

  if (isLoading) {
    return (
      <PostPageContainer>
        <CircularLoading />
      </PostPageContainer>
    );
  }

  return (
    <PostPageContainer>
      <Post post={post} initComt={true} />
    </PostPageContainer>
  );
};

export default PostPage;
