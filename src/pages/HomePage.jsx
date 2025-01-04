import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { getWords, saveToDatabase } from "../services/firebase";
import Header from "../components/Header/Header";
import CustomSnackbar from "../components/Snackbar/Snackbar";
import WordsList from "../components/WordList/WordList";
import StatBox from "../components/StatBox/StatBox";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
    background: { default: "#f4f4f9" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: "bold", fontSize: "2rem" },
    body2: { fontSize: "1rem" },
  },
});

const HomePage = () => {
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [correctWords, setCorrectWords] = useState(new Set());
  const [wrongWords, setWrongWords] = useState(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    const fetchWords = async () => {
      const wordsList = await getWords();
      setWords(wordsList);
      generateRandomWord(wordsList);
    };
    fetchWords();
  }, []);

  useEffect(() => {
    const saveStats = async () => {
      try {
        const stats = { correct: correctCount, wrong: wrongCount };
        await saveToDatabase(stats);
        localStorage.setItem("stats", JSON.stringify(stats));
        setSnackbar({ open: true, message: "Ответ сохранен!" });
      } catch {
        setSnackbar({
          open: true,
          message: "Ошибка при сохранении статистики",
        });
      }
    };

    const timer = setTimeout(saveStats, 1000);
    return () => clearTimeout(timer);
  }, [correctCount, wrongCount]);

  const generateRandomWord = (wordsList) => {
    if (!wordsList?.length) {
      setRandomWord(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    setRandomWord(wordsList[randomIndex]);
  };

  const handleWordAction = (isKnown) => {
    if (!randomWord) return;

    if (isKnown) {
      setCorrectWords((prev) => new Set([...prev, randomWord.english]));
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongWords((prev) => new Set([...prev, randomWord.english]));
      setWrongCount((prev) => prev + 1);
    }
    generateRandomWord(words);
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#5e5ea0",
        }}
      >
        <StatBox
          correctCount={correctCount}
          wrongCount={wrongCount}
          theme={theme}
        />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => handleWordAction(true)}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Знаю слово
          </Button>
          <Card
            sx={{
              width: "auto",
              minWidth: 400,
              height: 250,
              backgroundColor: "#e0e0e0",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h2">
                {randomWord?.english || "Загрузка..."}
              </Typography>
            </CardContent>
          </Card>
          <Button
            onClick={() => handleWordAction(false)}
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Не знаю слово
          </Button>
        </Box>
        <WordsList words={[...correctWords]} theme={theme} isCorrect />
        <WordsList words={[...wrongWords]} theme={theme} />
      </div>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </ThemeProvider>
  );
};

export default React.memo(HomePage);
