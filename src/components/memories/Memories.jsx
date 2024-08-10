import React from "react";
import styled from "styled-components";
import { Box, Typography, Paper, Divider, Avatar, Button } from "@mui/material";
import { Sidebar } from "./Sidebar";
import PeopleIcon from "@mui/icons-material/People";
import ReplyIcon from "@mui/icons-material/Reply";
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
  gap: 20px;
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
  max-height: 700px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 12px;
`;

const memories = [
  {
    id: 1,
    title: "Kỷ niệm 1",
    description: "Mô tả kỷ niệm 1",
    image: "memories_1.png",
  },
  {
    id: 2,
    title: "Kỷ niệm 2",
    description: "Mô tả kỷ niệm 2",
    image: "memories_2.png",
  },
  {
    id: 3,
    title: "Kỷ niệm 3",
    description: "Mô tả kỷ niệm 3",
    image: "memories_3.png",
  },
];

function MemoriesPage() {
  const hasMemories = memories.length > 0;
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
        </Card>

        {memories.map((memory) => (
          <MemoryCard>
            <Typography variant="overline" display="block" gutterBottom>
              Vào ngày này
            </Typography>
            <Typography variant="h6" gutterBottom>
              2 năm trước
            </Typography>
            <Divider
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                marginBottom: "10px",
              }}
            />
            <Box display="flex" alignItems="center" marginBottom="10px">
              <Avatar sx={{ marginRight: "10px" }}>
                <PeopleIcon />
              </Avatar>
              <div>
                <Typography variant="body2" sx={{fontWeight: '600'}}>Nguyen Ha Minh</Typography>
                <Typography variant="body2">October 13, 2019</Typography>
              </div>
            </Box>
            <Typography variant="body2" gutterBottom>
              Just a little cave diving/cliff jumping/zip lining adventure
              💦🤘🇲🇽
            </Typography>
            <div
              style={{
                borderRadius: "5px",
                overflow: "hidden",
                height: "400px",
              }}
            >
              <img
                src="/photos/photo04.jpg"
                alt="Memory"
                style={{ width: "100%" }}
              />
            </div>
            <Button
              variant="outlined"
              endIcon={<ReplyIcon color="primary" />}
              sx={{ marginTop: "10px", width: "100%" }}
            >
              Share
            </Button>
          </MemoryCard>
        ))}
      </Content>
    </Container>
  );
}

export default MemoriesPage;
