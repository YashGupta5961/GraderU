import { createTheme, ThemeProvider } from "@mui/material";
import { React } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";
import profile from "./assets/profile.png";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import Signup from "./components/auth/Signup";
import Verify from "./components/auth/Verify";
import HomeScreen from "./screens/homeScreen/homeScreen";
import CoursePage from "./components/CoursePage/CoursePage";
import ProfessorPage from "./components/ProfessorPage/profPage";

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

export default function App(props) {
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
                      <img className="logo" src={logo} alt="logo" />
                      <p>GraderU</p>
                    </div>

                    <button className="app-header-profile-btn">
                      <img
                        className="profile-img"
                        src={profile}
                        alt="profile-button"
                      />
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
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/professors" element={<ProfessorPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

// export default App = App;
