import { Box } from "@mui/material";
import styled from "styled-components";
import Post from "../home/NewsFeed/component/Post";

const PostContainer = styled(Box)`
  width: 60%;
`;

const posts = [];

const PostContent = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <PostContainer>
        {posts.map((post, index) => (
          <Post key={index} postId={post.id} />
        ))}
      </PostContainer>
      {/* Add more posts */}
    </Box>
  );
};

export default PostContent;
