import React  from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Verify from "./components/auth/Verify";
import CourseRatingsComponent from "./components/ratings/courseRatingsComponent";

let tempData = [
  {
    _id: "639001b951b4f01dd0bfef57",
    author: "638fff1a51b4f01dd0bfef48",
    rating: 5,
    text: "Great Course!",
    likes: [
        "638fff1a51b4f01dd0bfef48"
    ],
    dislikes: [],
    professor: "638853b2a1471e4a63800b61",
    course: "638851878ea935100c4327d9"
  },
  {
    _id: "639001b951b4f01dd0bfef57",
    author: "638fff1a51b4f01dd0bfef48",
    rating: 5,
    text: "Great Course!",
    likes: [
        "638fff1a51b4f01dd0bfef48"
    ],
    dislikes: [],
    professor: "638853b2a1471e4a63800b61",
    course: "638851878ea935100c4327d9"
  },
  {
    _id: "639001b951b4f01dd0bfef57",
    author: "638fff1a51b4f01dd0bfef48",
    rating: 5,
    text: "Great Course!",
    likes: [
        "638fff1a51b4f01dd0bfef48"
    ],
    dislikes: [],
    professor: "638853b2a1471e4a63800b61",
    course: "638851878ea935100c4327d9"
  },
]

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

// Create Application context
export function App(_props) {

  let router = (
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
      <Route path="/verify" element={<Verify />} />
    </Routes>
  </HashRouter>);

  return (
    <React.StrictMode>
      {/* <ThemeProvider theme={theme}> */}
        {/* {router} */}
        <CourseRatingsComponent filterName="professors" filterList={['yuliy', 'panav', 'aarushi']} reviewData={tempData} filterField={'professor'} reviewDataDispatcher={() => true}/>
      {/* </ThemeProvider> */}
    </React.StrictMode>
  );
};

