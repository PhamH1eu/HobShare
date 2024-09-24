import styled from "styled-components";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";

const Cancel = styled.button`
  position: absolute;
  right: 20px;
  bottom: 40px;
  background-color: #e8e4ec;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const CancelButton = () => {
  return (
    <Cancel>
      <PersonAddDisabledIcon
        // @ts-ignore
        color="white"
      />
      Huỷ yêu cầu
    </Cancel>
  );
};

export default CancelButton;
