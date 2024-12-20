import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Button, TextField, Typography, Box, Alert } from "@mui/material";

function AuthPage({ onClose, onUserLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Для регистрации
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0); // Состояние для вкладок (0 - Вход, 1 - Регистрация)

  const handleRegister = () => {
    if (!email) {
      setError("Поле email не должно быть пустым");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Некорректный формат email");
      return;
    }

    if (!name) {
      setError("Поле имя не должно быть пустым");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Пользователь зарегистрирован:", userCredential);

        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            console.log("Имя пользователя обновлено");
          })
          .catch((error) => {
            console.error("Ошибка при обновлении имени пользователя:", error);
          });

        // Передаем имя в родительский компонент
        onUserLogin(name);
        setEmail("");
        setPassword("");
        setName(""); // Очистить поле имени
        setError("");
        setActiveTab(0); // Переключаем на вкладку "Вход"
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
        const user = userCredential.user;
        onUserLogin(user.displayName); // Передаем имя пользователя после входа
        setEmail("");
        setPassword("");
        setError("");
        onClose();
      })
      .catch((error) => {
        console.error("Ошибка входа:", error);
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
        {activeTab === 0 ? "Вход" : "Регистрация"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Кнопки для переключения вкладок */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          color={activeTab === 0 ? "primary" : "default"}
          onClick={() => setActiveTab(0)}
        >
          Вход
        </Button>
        <Button
          variant="outlined"
          color={activeTab === 1 ? "primary" : "default"}
          onClick={() => setActiveTab(1)}
          sx={{ ml: 2 }}
        >
          Регистрация
        </Button>
      </Box>

      {/* Поля для регистрации */}
      {activeTab === 1 && (
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

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
        {activeTab === 0 ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Войти
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleRegister}
          >
            Зарегистрироваться
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default AuthPage;
