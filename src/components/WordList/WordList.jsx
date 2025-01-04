import { Grid, Card, Typography } from "@mui/material";
import { alpha } from "@mui/system";

const WordsList = ({ words, theme, isCorrect }) => {
  const cardStyles = {
    padding: 1,
    boxShadow: 1,
    borderRadius: 4,
    minWidth: 100,
    backgroundColor: isCorrect
      ? alpha(theme.palette.success.main, 0.2)
      : alpha(theme.palette.error.main, 0.2),
  };

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {words.slice(-10).map((word, index) => (
        <Grid item key={index}>
          <Card sx={cardStyles}>
            <Typography variant="body2">{word}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WordsList;
