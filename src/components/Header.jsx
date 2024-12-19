import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AuthPage from "../pages/AuthPage"; // Предполагается, что компонент AuthPage уже создан

function Header() {
  const [openAuth, setOpenAuth] = useState(false);

  const handleOpenAuth = () => setOpenAuth(true);
  const handleCloseAuth = () => setOpenAuth(false);

  return (
    <>
      <Button color="inherit" onClick={handleOpenAuth}>
        Войти / Регистрация
      </Button>

      <Dialog open={openAuth} onClose={handleCloseAuth} maxWidth="sm" fullWidth>
        <DialogTitle>Авторизация</DialogTitle>
        <DialogContent>
          <AuthPage />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
