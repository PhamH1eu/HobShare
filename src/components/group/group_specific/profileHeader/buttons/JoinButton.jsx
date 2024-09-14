import { Button } from "@mui/material";
import styled from "styled-components";

const StatusButton = styled(Button)`
  && {
    background-color: #e0dcdc;
    color: black;
    text-transform: none;
    border-radius: 8px;
    font-weight: bold;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const JoinButton = () => {
  return <StatusButton>Tham gia</StatusButton>;
};

export default JoinButton;
