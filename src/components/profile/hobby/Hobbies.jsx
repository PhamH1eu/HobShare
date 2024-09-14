import styled from "styled-components";
import "./hobbies.css";
import { useUserStore } from "src/store/userStore";
import useUserInfo from "src/shared/hooks/fetch/user/useUserInfo";

const HobbyWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 23vw;
  margin-top: 40px;
  padding: 20px;
  text-align: center;

  p {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 10px;
    margin-top: 0;
  }
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 5px;

  border-radius: 8px;
  overflow: hidden;

  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
  }
`;

const Hobbies = () => {
  const { currentUserId } = useUserStore();
  const { data: currentUser } = useUserInfo(currentUserId);

  return (
    <HobbyWrapper className="hobby-wrapper">
      <p>Hoạt động yêu thích</p>
      <ImageWrapper>
        {currentUser.favorite?.map((obj) => (
          <figure key={obj.image} className="image">
            <img src={obj.image} alt={obj.caption} />
            <figcaption>{obj.caption}</figcaption>
          </figure>
        ))}
      </ImageWrapper>
    </HobbyWrapper>
  );
};

export default Hobbies;
