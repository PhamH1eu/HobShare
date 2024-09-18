import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 1,
    label: "1km",
  },
  {
    value: 2,
    label: "2km",
  },
  {
    value: 3,
    label: "3km",
  },
  {
    value: 4,
    label: "4km",
  },
  {
    value: 5,
    label: "5km",
  },
  {
    value: 6,
    label: "6km",
  },
];

export default function DiscreteSlider({ defaultDistance, handleChange, disabled }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        defaultValue={defaultDistance}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        onChangeCommitted={handleChange}
        min={1}
        max={6}
        disabled={disabled}
      />
    </Box>
  );
}
