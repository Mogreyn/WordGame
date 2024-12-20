import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import AuthPage from "../pages/AuthPage";
import FocusLock from "react-focus-lock";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../assets/logo.png";

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

function Header() {
  const [openAuth, setOpenAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const handleOpenAuth = () => setOpenAuth(true);
  const handleCloseAuth = () => setOpenAuth(false);

  const handleUserLogin = (name) => {
    setUserName(name);
    handleCloseAuth();
  };

  const handleLogout = () => {
    setUserName("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        {/* Логотип */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6">WORD SWIPE</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {userName ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {userName}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleOpenAuth}>
              Войти / Регистрация
            </Button>
          )}
        </Box>
      </Box>

      <Dialog open={openAuth} onClose={handleCloseAuth} maxWidth="sm" fullWidth>
        <DialogTitle>Авторизация</DialogTitle>
        <DialogContent>
          <FocusLock autoFocus returnFocus>
            <AuthPage onClose={handleCloseAuth} onUserLogin={handleUserLogin} />
          </FocusLock>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default Header;
