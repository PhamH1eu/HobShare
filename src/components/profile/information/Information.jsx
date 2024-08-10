import styled from "styled-components";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import useModal from "src/hooks/useModal";
import ProfileEdit from "../EditModal";

import { useUserStore } from "src/store/userStore";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};

const BiographyWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 23vw;
  margin-top: 20px;

  padding: 15px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CenterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 1rem;
  margin: 10px 0;
`;

const Text = styled.span`
  margin-left: 10px;
`;

const EditButton = styled.button`
  background-color: #e4e6eb;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;

  &:hover {
    background-color: #ddd;
  }
`;

const Information = () => {
  const { currentUser } = useUserStore();
  const { userId } = useParams();
  const isViewingOwnProfile = userId === currentUser.id;
  const { open, handleOpen, handleClose } = useModal();

  return (
    <BiographyWrapper>
      <h2>Giới thiệu</h2>
      <Section>
        <CenterItem>
          <Title>blank</Title>
        </CenterItem>
        <Item>
          <BusinessCenterIcon color="greyIcon" />
          <Text>
            Làm việc tại <strong>CMC Global</strong>
          </Text>
        </Item>
        <Item>
          <SchoolIcon color="greyIcon" />
          <Text>
            Học tại{" "}
            <strong>
              Khoa Công nghệ Thông tin - Trường ĐH Công Nghệ - VNU
            </strong>
          </Text>
        </Item>
        <Item>
          <WatchLaterIcon color="greyIcon" />
          <Text>Tham gia vào Tháng 8 năm 2016</Text>
        </Item>
        {isViewingOwnProfile && (
          <EditButton onClick={handleOpen}>Chỉnh sửa chi tiết</EditButton>
        )}
      </Section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProfileEdit handleClose={handleClose} />
        </Box>
      </Modal>
    </BiographyWrapper>
  );
};

export default Information;
