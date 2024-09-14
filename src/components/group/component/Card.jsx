import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import useMembersCount from "src/shared/hooks/fetch/group/useMemberCount";
import CircularLoading from "src/shared/components/Loading";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 320,
  borderRadius: "12px",
  boxShadow: theme.shadows[2],
  position: "relative",
}));

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: "100%",
}));

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});

const GroupCard = ({ group }) => {
  const { membersCount, isLoading } = useMembersCount(group.id);
  const navigate = useNavigate();

  if (isLoading) return <CircularLoading />;
  
  return (
    <StyledCard>
      <StyledIconButton>
        <CloseIcon />
      </StyledIconButton>
      <StyledCardMedia
        image={group.wallpaper}
        title={group.name}
      />
      <CardContent>
        <Typography variant="h6">{group.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {membersCount} thành viên • 10 bài viết/ngày
        </Typography>
        <StyledButton onClick={() => navigate(`/group/${group.id}`)} variant="contained" color="primary">
          Tham gia nhóm
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default GroupCard;
