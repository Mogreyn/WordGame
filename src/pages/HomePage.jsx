import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  alpha,
} from "@mui/material";
import { getWords } from "../services/firebase";
import Header from "../components/Header/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f4f4f9",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
});

const HomePage = () => {
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [correctWords, setCorrectWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      const wordsList = await getWords();
      setWords(wordsList);
      generateRandomWord(wordsList);
    };

    fetchWords();
  }, []);

  const generateRandomWord = (wordsList) => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    setRandomWord(wordsList[randomIndex]);
  };

  const handleKnowWord = () => {
    if (randomWord && !correctWords.includes(randomWord.english)) {
      setCorrectWords((prevWords) => [...prevWords, randomWord.english]);
    }
    generateRandomWord(words);
  };

  const handleDontKnowWord = () => {
    if (
      randomWord &&
      !wrongWords.some((word) => word.english === randomWord.english)
    ) {
      setWrongWords((prevWords) => [...prevWords, randomWord]);
    }
    generateRandomWord(words);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          backgroundColor: "#5e5ea0",
        }}
      >
        {/* Бокс сверху: Знаю */}
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            padding: 2,
            boxShadow: 3,
            overflowX: "auto",
            display: "flex",
            alignItems: "center",
            borderRadius: 4,

          }}
        >
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {correctWords.slice(-10).map((word, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    padding: 1,
                    backgroundColor: alpha(theme.palette.success.main, 0.2),
                    boxShadow: 1,
                    minWidth: 100,
                  }}
                >
                  <Typography variant="body2">{word}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Центральный контент */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Button
            onClick={handleKnowWord}
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 2,
              padding: "8px 16px",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#4e494a",
              },
            }}
          >
            Знаю слово
          </Button>

          <Card
            sx={{
              width: "auto",
              minWidth: 400,
              height: 250,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 8,
              transition: "background-color 0.3s ease",
              marginBottom: "20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h2"
                sx={{ fontSize: "5rem", color: "white" }}
              >
                {randomWord ? randomWord.english : "Загрузка..."}
              </Typography>
            </CardContent>
          </Card>

          <Button
            onClick={handleDontKnowWord}
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              padding: "8px 16px",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#4e494a",
              },
            }}
          >
            Не знаю слово
          </Button>
        </Box>

        {/* Бокс снизу: Не знаю */}
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            padding: 2,
            boxShadow: 3,
            overflowX: "auto",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 4,

          }}
        >
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {wrongWords.slice(-10).map((word, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    padding: 1,
                    backgroundColor: alpha(theme.palette.error.main, 0.2),
                    boxShadow: 1,
                    minWidth: 100,
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {word.english}
                    </Typography>
                    <Typography variant="body2">{word.russian}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default React.memo(HomePage);
