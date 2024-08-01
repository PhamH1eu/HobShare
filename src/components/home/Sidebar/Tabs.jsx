import styled from "styled-components";
import PeopleIcon from "@mui/icons-material/People";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupIcon from "@mui/icons-material/Group";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useUserStore } from "src/store/userStore";

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
        <PeopleIcon color="black" />
        <span>Bạn bè</span>
      </MenuItem>
      <MenuItem>
        <WatchLaterIcon color="black" />
        <span>Kỷ niệm</span>
      </MenuItem>
      <MenuItem>
        <BookmarkIcon color="black" />
        <span>Đã lưu</span>
      </MenuItem>
      <MenuItem>
        <GroupIcon color="black" />
        <span>Nhóm</span>
      </MenuItem>
      <MenuItem>
        <ArrowDropDownCircleIcon color="black" />
        <span>Xem thêm</span>
      </MenuItem>
    </SidebarWrapper>
  );
};

export default Tabs;
