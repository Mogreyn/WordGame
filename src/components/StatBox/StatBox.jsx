import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/system";

const StatsBox = ({ correctCount, wrongCount, theme }) => (
  <Box
    sx={{
      width: "300px",
      padding: 2,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: 3,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 4,
      marginBottom: 2,
      marginX: "auto",
    }}
  >
    <Typography variant="h6">Правильных: {correctCount}</Typography>
    <Typography variant="h6">Неправильных: {wrongCount}</Typography>
  </Box>
);

export default StatsBox;
