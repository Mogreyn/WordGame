import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { getWords } from "../services/firebase";
import Header from "../components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#388e3c",
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
  spacing: 8,
});

const HomePage = () => {
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState(null);

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

  if (words.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "16px",
          backgroundColor: "#5e5ea0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => generateRandomWord(words)}
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 2,
              padding: "8px 16px",
              backgroundColor: "#ff4081",
              color: "white",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#4e494a",
              },
            }}
          >
            Сгенерировать слово
          </Button>

          <Card
            sx={{
              width: "auto",
              minWidth: 400,
              height: 250,
              backgroundColor: theme.palette.primary.main,
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: 8,
              transition: "background-color 0.3s ease",
            }}
          >
            <CardContent>
              <Typography
                variant="h2"
                sx={{ fontSize: "5rem", color: "white" }}
              >
                {randomWord ? randomWord.english : "Загрузка..."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {randomWord ? randomWord.russian : ""}
              </Typography>
            </CardContent>
            
          </Card>
          <Button
            onClick={() => generateRandomWord(words)}
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              padding: "8px 16px",
              backgroundColor: "#ff4081",
              color: "white",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#4e494a",
              },
            }}
          >
            Сгенерировать слово
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
