import styled from "styled-components";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HouseIcon from "@mui/icons-material/House";
import PlaceIcon from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import useModal from "src/shared/hooks/util/useModal";
import ProfileEdit from "./EditModal";

import { useUserStore } from "src/store/userStore";
import { useParams } from "react-router-dom";
import useUserInfo from "src/shared/hooks/fetch/useUserInfo";

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
  margin-top: 5px;
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
  const { open, handleOpen, handleClose } = useModal();
  const { currentUserId } = useUserStore();
  const { groupId } = useParams();
  const isViewingOwnProfile = groupId === currentUserId;

  const { data: userProfile } = useUserInfo(groupId);

  return (
    <BiographyWrapper>
      <h2>Giới thiệu</h2>
      <Section>
        {userProfile.bio?.showBio && (
          <CenterItem>
            <Title>{userProfile.bio.biography}</Title>
          </CenterItem>
        )}
        {userProfile.bio?.showWork && (
          <Item>
            <BusinessCenterIcon
              // @ts-ignore
              color="greyIcon"
            />
            <Text>
              Làm việc tại <strong>{userProfile.bio.work}</strong>
            </Text>
          </Item>
        )}
        {userProfile.bio?.showEducation && (
          <Item>
            <SchoolIcon
              // @ts-ignore
              color="greyIcon"
            />
            <Text>
              Học tại <strong>{userProfile.bio.education}</strong>
            </Text>
          </Item>
        )}
        {userProfile.bio?.showCurrentCity && (
          <Item>
            <HouseIcon
              // @ts-ignore
              color="greyIcon"
            />
            <Text>
              Sống tại <strong>{userProfile.bio.currentCity}</strong>
            </Text>
          </Item>
        )}
        {userProfile.bio?.showHomeTown && (
          <Item>
            <PlaceIcon
              // @ts-ignore
              color="greyIcon"
            />
            <Text>
              Đến từ <strong>{userProfile.bio.homeTown}</strong>
            </Text>
          </Item>
        )}
        <Item>
          <WatchLaterIcon
            // @ts-ignore
            color="greyIcon"
          />
          <Text>Tham gia vào {formatDate(userProfile.createdAt)}</Text>
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

function formatDate(date) {
  const formatDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  return formatDate.toLocaleDateString("vi-vn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default Information;
