import { React } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      background: "#404258",
      light: "#9575cd",
      main: "#5e35b1",
      dark: "#311b92",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: "Courier Prime",
    button: {
      textTransform: "none",
    },
  },
});

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Typography component="h1" variant="h4">
                Home
              </Typography>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
