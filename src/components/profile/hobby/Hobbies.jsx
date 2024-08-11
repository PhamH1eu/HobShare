import styled from "styled-components";
import "./hobbies.css";
import React from "react";

const images = [
  { src: "/photos/photo01.jpg", label: "Sample image 1" },
  { src: "/photos/photo02.jpg", label: "Sample image 2" },
  { src: "/photos/photo03.jpg", label: "Sample image 3" },
  { src: "/photos/photo04.jpg", label: "Sample image 4" },
  { src: "/photos/photo05.jpg", label: "Sample image 5" },
  { src: "/photos/photo06.jpg", label: "Sample image 6" },
  { src: "/photos/photo07.jpg", label: "Sample image 7" },
  { src: "/photos/photo01.jpg", label: "Sample image 1" },
  { src: "/photos/photo02.jpg", label: "Sample image 2" },
];

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
  return (
    <HobbyWrapper className="hobby-wrapper">
      <p>Hoạt động yêu thích</p>
      <ImageWrapper>
        {images.map((obj) => (
          <figure key={obj.src} className="image">
            <img src={obj.src} alt={obj.label} />
            <figcaption>{obj.label}</figcaption>
          </figure>
        ))}
      </ImageWrapper>
    </HobbyWrapper>
  );
};

export default Hobbies;
