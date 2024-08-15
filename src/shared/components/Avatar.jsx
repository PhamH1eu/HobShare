import { styled as muiStyled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import useListenOnline from "src/hooks/listen/useListenOnline";
import { Avatar as AvatarImage } from "@mui/material";

const StyledBadge = muiStyled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "10px",
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const Avatar = ({ src, receiverId }) => {
  const { online } = useListenOnline(receiverId);
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      color={online ? "primary" : "error"}
      // @ts-ignore
    >
      <AvatarImage src={src} sx={{ width: "50px", height: "50px" }} />
    </StyledBadge>
  );
};

export default Avatar;
