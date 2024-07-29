import styled from "styled-components";
import PeopleIcon from "@mui/icons-material/People";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupIcon from "@mui/icons-material/Group";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useUserStore } from "src/store/userStore";

const SidebarWrapper = styled.div`
  width: 300px;
  color: white;
  margin: 5px;
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: sticky;
  top: 74px;
  height: calc(100vh - 79px);
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px;

  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
    background-color: rgba(255, 255, 255, 0.1);
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
        <PeopleIcon />
        <span>Bạn bè</span>
      </MenuItem>
      <MenuItem>
        <WatchLaterIcon />
        <span>Kỷ niệm</span>
      </MenuItem>
      <MenuItem>
        <BookmarkIcon />
        <span>Đã lưu</span>
      </MenuItem>
      <MenuItem>
        <GroupIcon />
        <span>Nhóm</span>
      </MenuItem>
      <MenuItem>
        <ArrowDropDownCircleIcon />
        <span>Xem thêm</span>
      </MenuItem>
    </SidebarWrapper>
  );
};

export default Tabs;
