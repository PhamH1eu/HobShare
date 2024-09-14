import { Box, Typography, Grid, Divider } from "@mui/material";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "./swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import GroupCard from "./Card";
import useGroups from "src/shared/hooks/fetch/group/useGroups";
import CircularLoading from "src/shared/components/Loading";

const GroupRecommend = () => {
  const { groups, isLoading } = useGroups();
  if (isLoading) return <CircularLoading />;
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
          {groups.map((group) => {
            return (
              <SwiperSlide>
                <GroupCard group={group}/>
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
        {groups.map((group) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <GroupCard group={group}/>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GroupRecommend;
