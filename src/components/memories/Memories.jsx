import styled from "styled-components";
import { Box, Typography, Paper } from "@mui/material";
import { Sidebar } from "./Sidebar";
import usePosts from "src/shared/hooks/fetch/post/usePosts";
import Post from "../home/NewsFeed/component/Post";
import CircularLoading from "src/shared/components/Loading";
const Container = styled(Box)`
  margin-top: 64px;
  display: flex;
  width: 100%;
  background-color: #f0f2f5;
  overflow-y: auto;
`;

const Content = styled(Box)`
  flex-grow: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Card = styled(Paper)`
  max-width: 600px;
  text-align: center;
  border-radius: 12px;

  img {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

const MemoryCard = styled(Paper)`
  max-width: 600px;
  min-width: 600px;
  max-height: 700px;
  padding: 0px;
  background-color: transparent;
  border: none;
  box-shadow: none;
`;

function MemoriesPage() {
  const { posts, isLoading } = usePosts();
  const hasMemories = posts.length > 0;

  return (
    <Container>
      <Sidebar />
      <Content>
        <Card>
          <img
            src="memories_header.png"
            alt="Memories"
            style={{ width: "100%" }}
          />
          {!hasMemories && (
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
              Không có kỷ niệm hôm nay
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{ fontSize: "1rem", padding: "16px" }}
          >
            {hasMemories
              ? "Chúng tôi hy vọng bạn thích ôn lại và chia sẻ kỷ niệm trên HobShare, từ các kỷ niệm gần đây nhất đến những kỷ niệm ngày xa xưa."
              : "Hôm nay không có Kỷ niệm nào để xem hay chia sẻ, nhưng chúng tôi sẽ thông báo cho bạn khi bạn có khoảnh khắc để ôn lại."}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            Vào ngày này
          </Typography>
          <Typography variant="h6" gutterBottom>
            2 năm trước
          </Typography>
        </Card>

        {isLoading ? (
          <CircularLoading />
        ) : (
          posts.map((post, index) => (
            <MemoryCard key={index}>
              <Post post={post} initComt={undefined} />
            </MemoryCard>
          ))
        )}
      </Content>
    </Container>
  );
}

export default MemoriesPage;
