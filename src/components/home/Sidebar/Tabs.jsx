import styled from "styled-components";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useUserStore } from "src/store/userStore";
import "./tab.css";

const SidebarWrapper = styled.div`
  width: 280px;
  margin: 20px;
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;

  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(228,230,233,255);
`;

const ProfilePicture = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;
const ProfileName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(228, 230, 233, 255);
  }

  span {
    font-size: 15px;
    color: #050505;
    font-weight: 500;
  }
`;

const Tabs = () => {
  const { currentUser } = useUserStore();
  return (
    <SidebarWrapper>
      <Profile>
        <ProfilePicture src={currentUser.avatar} alt="Profile" />
        <ProfileName>{currentUser.username}</ProfileName>
      </Profile>
      <MenuItem>
        <PeopleIcon className="people" />
        <span>Bạn bè</span>
      </MenuItem>
      <MenuItem
        className={`${currentUser.denyExposingLocation ? "disabled" : ""}`}
        onClick={() => console.log("Location")}
      >
        <PinDropIcon className="location" />
        <span>Sở thích gần bạn</span>
      </MenuItem>
      <MenuItem>
        <Diversity2Icon className="group" />
        <span>Nhóm</span>
      </MenuItem>
      <MenuItem>
        <BookmarkIcon className="saved" />
        <span>Đã lưu</span>
      </MenuItem>
      <Accordion style={{ marginTop: 0 }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownCircleIcon color="warning" />}
          style={{ flexDirection: "row-reverse" }}
        >
          <MenuItem>
            <span>Xem Thêm</span>
          </MenuItem>
        </AccordionSummary>
        <AccordionDetails>
          <MenuItem>
            <WatchLaterOutlinedIcon className="memories" />
            <span>Kỉ niệm</span>
          </MenuItem>
        </AccordionDetails>
      </Accordion>
    </SidebarWrapper>
  );
};

export default Tabs;
