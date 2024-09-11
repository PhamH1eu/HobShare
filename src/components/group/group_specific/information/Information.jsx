import Description from "./Description";
import styled from "styled-components";

const InfoWrapper = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Information = () => {
  return (
    <InfoWrapper>
      <div style={{ width: "65%" }}>
        <Description></Description>
      </div>
    </InfoWrapper>
  );
};

export default Information;
