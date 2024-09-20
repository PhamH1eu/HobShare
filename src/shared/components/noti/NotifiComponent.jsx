import { toast } from "react-hot-toast";
import { timeDiff } from "../../helper/timeDiff";

import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import StyledLink from "../StyledLink";
import { useQueryClient } from "react-query";
import { NotificationService } from "src/services/SubDatabaseService";
import { useUserStore } from "src/store/userStore";
import { increment } from "firebase/firestore";

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 0;

  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background-color: #f0f2f5;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  flex-grow: 1;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const TimeLabel = styled.span`
  color: #6ec924;
  font-size: 12px;
  margin-top: 5px;
  display: inline-block;
`;

const IndicatorDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #6ec924;
  border-radius: 50%;
`;

export const NotifiComponent = ({ message, t }) => {
  const { currentUserId } = useUserStore();
  const queryClient = useQueryClient();
  const read = async () => {
    toast.dismiss(t.id);
    const updateStatus = NotificationService.updateSubCollection(
      `${currentUserId}/notifications/${message.id}`,
      "isRead",
      true
    );
    const updateCount = await NotificationService.updateSubCollection(
      `${currentUserId}`,
      "unreadNotis",
      increment(-1)
    );
    await Promise.all([updateStatus, updateCount]);
    queryClient.invalidateQueries("notifications");
  };
  let dateObj = new Date(message.createdAt);
  dateObj.setSeconds(dateObj.getSeconds() - 10);
  const newNotiDate = dateObj.toISOString();

  return (
    <NotificationContainer>
      <Header>
        Thông báo mới
        <IconButton onClick={() => toast.dismiss(t.id)}>
          <CloseIcon />
        </IconButton>
      </Header>
      <StyledLink to={message.url} onClick={read}>
        <Content>
          <ProfileImage src={message.sourceImage} alt="Profile" />
          <TextContainer>
            <div>
              <UserName>{message.sourceName}</UserName> {message.content}
            </div>
            <TimeLabel>{timeDiff(newNotiDate)}</TimeLabel>
          </TextContainer>
          <IndicatorDot />
        </Content>
      </StyledLink>
    </NotificationContainer>
  );
};
