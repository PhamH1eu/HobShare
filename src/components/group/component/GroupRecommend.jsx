import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, Button, Avatar, Grid } from "@mui/material";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const PostContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
}));

const GroupCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  width: "300px",
  position: "relative",
}));

const GroupAvatar = styled(Avatar)(({ theme }) => ({
  width: "50px",
  height: "50px",
  marginRight: theme.spacing(1),
}));

const GroupDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const JoinButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const GroupDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

const rec = [
  {
    id: 1,
    name: "PhD.Hub",
    description: "43K thành viên • 10 bài viết/ngày",
    members: "Phạm Xuân Bách và 5 người bạn là thành viên",
    image: "https://path-to-image-1.jpg",
  },
  {
    id: 2,
    name: "Build in public VN",
    description: "11K thành viên • 2 bài viết/ngày",
    members: "Nguyễn Cao Quang và 3 người bạn là thành viên",
    image: "https://path-to-image-2.jpg",
  },
  {
    id: 3,
    name: "PhD.Hub",
    description: "43K thành viên • 10 bài viết/ngày",
    members: "Phạm Xuân Bách và 5 người bạn là thành viên",
    image: "https://path-to-image-1.jpg",
  },
  {
    id: 4,
    name: "Build in public VN",
    description: "11K thành viên • 2 bài viết/ngày",
    members: "Nguyễn Cao Quang và 3 người bạn là thành viên",
    image: "https://path-to-image-2.jpg",
  },
];

const GroupRecommend = () => {
  return (
    <Box sx={{ padding: "16px", width: "1200px" }}>
      {/* First section: Swiper for sliding groups */}
      <Typography variant="h6" gutterBottom>
        Gợi ý cho bạn
      </Typography>
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        navigation={true} // Enable navigation
        loop={false}
        centeredSlides={false}
        modules={[Navigation]} // Include Navigation module
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {rec.map((group) => {
          return (
            <SwiperSlide>
              <GroupCard>
                <GroupDetails>
                  <GroupAvatar src="https://path-to-image-1.jpg" />
                  <Box>
                    <GroupTitle>PhD.Hub</GroupTitle>
                    <GroupDescription>
                      43K thành viên • 10 bài viết/ngày
                    </GroupDescription>
                    <Typography variant="caption" color="textSecondary">
                      Phạm Xuân Bách và 5 người bạn là thành viên
                    </Typography>
                  </Box>
                </GroupDetails>
                <JoinButton variant="contained">Tham gia nhóm</JoinButton>
              </GroupCard>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Second section: Grid for other group suggestions */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "24px" }}>
        Gợi ý khác
      </Typography>
      <Grid container spacing={2}>
        {rec.map((group) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <GroupCard>
                <img
                  src="https://path-to-image-4.jpg"
                  alt="Group"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <GroupTitle>Hội Chè Đồ Ăn Có Tâm</GroupTitle>
                <GroupDescription>
                  Group description goes here...
                </GroupDescription>
                <JoinButton variant="contained">Tham gia nhóm</JoinButton>
              </GroupCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GroupRecommend;
