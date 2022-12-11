import { React } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Verify from "./components/auth/Verify";

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
              <div className="app-container">
                <div className="app-header">
                    <div className="header-row-1">
                      <div className="app-header-title">
                        <img className="logo" src='https://cryptologos.cc/logos/cosmos-atom-logo.png' alt="logo" />
                        <p>GraderU</p>
                      </div>

                      <button className="app-header-profile-btn" >
                          <img className="profile-img" src="https://www.nicepng.com/png/full/202-2024580_png-file-profile-icon-vector-png.png" alt="profile-button" />
                      </button>
                    </div>

                    <div className="app-header-btns">
                        <button className="home-btn">Home</button>
                        <button className="calculator-btn">Grade Calculator</button>
                    </div>
                </div>
                <HomeScreen />
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};
export default App;
