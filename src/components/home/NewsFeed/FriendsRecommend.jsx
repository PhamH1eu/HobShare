import styled from "styled-components";
import UserCard from "./component/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useSuggestedFriend from "src/shared/hooks/fetch/friend/useSuggestedFriend";
import CircularLoading from "src/shared/components/Loading";

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
  const { users, isLoading } = useSuggestedFriend();

  if (isLoading) {
    return (
      <Wrapper>
        <span>Những người bạn có thể biết</span>
        <CircularLoading />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <span>Những người bạn có thể biết</span>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        style={{ maxWidth: "43vw", padding: "18px" }}
      >
        {users.map((friend, index) => (
          <SwiperSlide key={index}>
            <UserCard user={friend} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default FriendsRecommend;
