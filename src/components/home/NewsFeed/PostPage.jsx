import { useParams } from "react-router-dom";
import Post from "./component/Post";
import styled from "styled-components";

const PostPageContainer = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;

  & > div {
    max-width: 600px;
    width: 100%;
    height: fit-content;
  }
`;

const PostPage = () => {
  const { postId } = useParams();

  return (
    <PostPageContainer>
      <Post postId={postId} initComt={true} isAdminGroup={undefined} />
    </PostPageContainer>
  );
};

export default PostPage;
