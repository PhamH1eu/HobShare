import styled from "styled-components";
import UserCard from "./component/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useRecNewUsers from "src/shared/hooks/fetch/recommend/useNewUsersRec";
import { Skeleton } from "@mui/material";

const Wrapper = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;

  span {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const FriendsRecommend = () => {
  const { friends, isLoading, basedOnLocation } = useRecNewUsers();

  if (isLoading) {
    return (
      <Wrapper>
        <span>Đang tìm bạn bè để gợi ý....</span>
        <div
          style={{
            maxWidth: "43vw",
            padding: "18px",
            gap: "20px",
            display: "flex",
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height="220px"
            width="124px"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height="220px"
            width="124px"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height="220px"
            width="124px"
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height="220px"
            width="124px"
          />
        </div>
      </Wrapper>
    );
  }

  if (friends.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      {basedOnLocation ? (
        <span>Những người ở gần bạn</span>
      ) : (
        <span>Những người có chung sở thích với bạn</span>
      )}
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        style={{ maxWidth: "43vw", padding: "18px" }}
      >
        {friends.map((friend, index) => (
          <SwiperSlide key={index}>
            <UserCard userId={friend.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default FriendsRecommend;
