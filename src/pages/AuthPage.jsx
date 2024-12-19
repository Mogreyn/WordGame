import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Для отображения ошибок

  const handleRegister = () => {
    if (!email) {
      setError("Поле email не должно быть пустым");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Некорректный формат email");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Пользователь зарегистрирован:", userCredential);
        setEmail("");
        setPassword("");
        setError(""); // Сброс ошибки при успешной регистрации
      })
      .catch((error) => {
        setError("Ошибка регистрации: " + error.message);
      });
  };

  const handleLogin = () => {
    if (!email) {
      setError("Поле email не должно быть пустым");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Некорректный формат email");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Вход выполнен:", userCredential);
        setEmail("");
        setPassword("");
        setError(""); // Сброс ошибки при успешном входе
      })
      .catch((error) => {
        console.error("Ошибка входа:", error); // Логирование ошибки для диагностики
        switch (error.code) {
          case "auth/user-not-found":
            setError("Пользователь с таким email не найден.");
            break;
          case "auth/wrong-password":
            setError("Неверный пароль.");
            break;
          case "auth/invalid-email":
            setError("Некорректный формат email.");
            break;
          case "auth/invalid-credential":
            setError("Ошибка входа: неверные учетные данные.");
            break;
          default:
            setError("Неизвестная ошибка: " + error.message);
        }
      });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Вход / Регистрация
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}{" "}
      {/* Отображение ошибки */}
      <TextField
        label="Email"
        placeholder="example@domain.com"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Войти
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 1 }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
}

export default AuthPage;
