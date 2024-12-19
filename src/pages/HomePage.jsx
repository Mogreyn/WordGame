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
import "./homePage.css"; 
import Header from "../components/Header";
import AuthPage from "./AuthPage";


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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const fetchWords = async () => {
      const wordsList = await getWords();
      setWords(wordsList);
    };

    fetchWords();
  }, []);

  if (words.length === 0) {
    return <div>Загрузка...</div>;
  }

  const nextWord = () => {
    setCurrentWordIndex((prevState) => (prevState + 1) % words.length);
  };

  const prevWord = () => {
    setCurrentWordIndex(
      (prevState) => (prevState - 1 + words.length) % words.length
    );
  };

  const currentWord = words[currentWordIndex];

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <div
        className="container"
        style={{
          padding: theme.spacing(2),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={prevWord}
            variant="contained"
            color="primary"
            sx={{
              marginRight: theme.spacing(2),
            }}
          >
            Предыдущее
          </Button>

          <Card
            sx={{
              width: "auto",
              minWidth:400,
              height: 250,
              backgroundColor: theme.palette.primary.main,
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography
                variant="h2"
                fontSize="8rem"
                component="div"
                color="white"
              >
                {currentWord.english}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentWord.russian}
              </Typography>
            </CardContent>
          </Card>

          <Button
            onClick={nextWord}
            variant="contained"
            color="secondary"
            sx={{
              marginLeft: theme.spacing(2),
            }}
          >
            Следующее
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
