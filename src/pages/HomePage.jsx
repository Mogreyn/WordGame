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
import "./homePage.css"; // Подключаем CSS файл

// Создаем тему
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Синий цвет для первичных элементов
    },
    secondary: {
      main: "#ff4081", // Розовый цвет для вторичных элементов
    },
    error: {
      main: "#d32f2f", // Красный цвет для ошибок
    },
    success: {
      main: "#388e3c", // Зеленый цвет для успеха
    },
    background: {
      default: "#f4f4f9", // Основной цвет фона
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
  spacing: 8, // Стандартный интервал
});

const HomePage = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Загрузка слов из Firebase
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
          {/* Кнопка "Предыдущее слово" слева */}
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

          {/* Карточка со словом */}
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

          {/* Кнопка "Следующее слово" справа */}
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
