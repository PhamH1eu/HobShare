import { Box, Typography, Grid, Divider } from "@mui/material";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "./swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import GroupCard from "./Card";

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
    <Box sx={{ padding: "0 24px", width: "calc(100vw-340px)" }}>
      {/* First section: Swiper for sliding groups */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "600", marginBottom: 0, padding: "0 44px" }}
        gutterBottom
      >
        Gợi ý cho bạn
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontSize: "1rem",
          padding: "0 44px",
          marginBottom: 2,
        }}
      >
        Dựa trên sở thích của bạn
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="my-swiper-button-prev">
          <ArrowBackIosNewIcon />
        </button>
        <Swiper
          style={{ paddingBottom: "12px" }}
          spaceBetween={16}
          slidesPerView={3}
          loop={false}
          centeredSlides={false}
          navigation={{
            nextEl: ".my-swiper-button-next",
            prevEl: ".my-swiper-button-prev",
          }}
          modules={[Navigation]} // Include Navigation module
        >
          {rec.map((group) => {
            return (
              <SwiperSlide>
                <GroupCard />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button className="my-swiper-button-next">
          <ArrowForwardIosIcon />
        </button>
      </div>

      <Divider sx={{ marginY: 2 }} />

      {/* Second section: Grid for other group suggestions */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginTop: "24px", fontWeight: "600", padding: "0 44px" }}
      >
        Gợi ý khác
      </Typography>
      <Grid container spacing={2} sx={{ padding: "0 44px" }}>
        {rec.map((group) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <GroupCard />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GroupRecommend;
