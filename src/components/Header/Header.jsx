import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import AuthPage from "../../pages/AuthPage";
import FocusLock from "react-focus-lock";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/logo.png";

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
  },
});

const Header = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const handleOpenAuth = () => setOpenAuth(true);
  const handleCloseAuth = () => setOpenAuth(false);

  return (
    <ThemeProvider theme={theme}>
      <Box
        position="sticky"
        top="0"
        left="0"
        backgroundColor="#1976d2"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
      >
        <img src={logo} alt="Logo" style={{ width: "50px", height: "auto" }} />
        <Typography variant="h6">
          {userName ? `Добро пожаловать, ${userName}` : "Добро пожаловать"}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAuth}>
          {userName ? "Logout" : "Login"}
        </Button>
      </Box>
      <Dialog open={openAuth} onClose={handleCloseAuth}>
        <FocusLock>
          <DialogTitle>{userName ? "Logout" : "Вход/Регистрация"}</DialogTitle>
          <DialogContent>
            <AuthPage
              onClose={handleCloseAuth}
              onUserLogin={(userName) => {
                console.log("Пользователь вошёл:", userName);
                setUserName(userName);
              }}
            />
          </DialogContent>
        </FocusLock>
      </Dialog>
    </ThemeProvider>
  );
};

export default React.memo(Header);
