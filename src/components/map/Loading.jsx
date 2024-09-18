import CircularLoading from "src/shared/components/Loading";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const LoadingCircle = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${({ visible }) => (visible ? slideDown : slideUp)} 0.5s forwards;
  z-index: 1000;
`;

const LoadingCircleSlide = ({ loading }) => {
  return (
    <LoadingCircle visible={loading}>
        <CircularLoading/>
    </LoadingCircle>
  );
};

export default LoadingCircleSlide;
