import styled from "styled-components";
import { styled as MuiStyled, Typography } from "@mui/material";

const InfoWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 20px;
  width: 100%;
  padding: 15px;
`;

const VisibilityItem = MuiStyled(Typography)({
  fontSize: "1rem",
  wordWrap: "break-word",
  color: "#333",
  marginBottom: "4px",
});

const Description = () => {
  return (
    <InfoWrapper>
      <h2>Giới thiệu</h2>
      <VisibilityItem>
        Đây là 1 nhóm ưa thích đi chơi dã ngoại cùng nhau
      </VisibilityItem>
    </InfoWrapper>
  );
};

export default Description;
