import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={message.includes("Ошибка") ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
