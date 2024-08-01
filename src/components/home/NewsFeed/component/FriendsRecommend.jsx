import styled from "styled-components";
import UserCard from "./Card";

const Wrapper = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;

  span {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const Friends = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const friends = [
  {
    name: "Nichan Ikuyo",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    mutualFriends: 13,
  },
  {
    name: "Nichan Ikuyo",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    mutualFriends: 13,
  },
  {
    name: "Nichan Ikuyo",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    mutualFriends: 13,
  },
  {
    name: "Nichan Ikuyo",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    mutualFriends: 13,
  },
  {
    name: "Nichan Ikuyo",
    avatar:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-52.jpg",
    mutualFriends: 13,
  },
];

const FriendsRecommend = () => {
  return (
    <Wrapper>
      <span>Những người bạn có thể biết</span>
      <Friends>
        {friends.map((friend, index) => (
          <UserCard key={index} user={friend} />
        ))}
      </Friends>
    </Wrapper>
  );
};

export default FriendsRecommend;
