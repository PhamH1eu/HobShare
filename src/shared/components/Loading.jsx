import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        height: "-webkit-fill-available",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
