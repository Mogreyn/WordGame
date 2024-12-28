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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <img src={logo} alt="Logo" />
        <Typography variant="h6">{userName ? `Welcome, ${userName}` : "Welcome"}</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAuth}>
          {userName ? "Logout" : "Login"}
        </Button>
      </Box>
      <Dialog open={openAuth} onClose={handleCloseAuth}>
        <FocusLock>
          <DialogTitle>{userName ? "Logout" : "Login"}</DialogTitle>
          <DialogContent>
            <AuthPage setUserName={setUserName} onClose={handleCloseAuth} />
          </DialogContent>
        </FocusLock>
      </Dialog>
    </ThemeProvider>
  );
};

export default React.memo(Header);
