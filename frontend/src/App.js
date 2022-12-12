import React  from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Verify from "./components/auth/Verify";
import CourseRatingsComponent from "./components/ratings/courseRatingsComponent";
import CoursePage from "./components/CoursePage/CoursePage";
import ProfPage from "./components/ProfessorPage/profPage";
import GpaPage from "./components/gpaCalculator/gpaPage";

let tempData = [
  {
      "profId": "638853b2a1471e4a637ff89c",
      "profName": "Hwu, Wen-Mei W",
      "courseData": [
          {
              "courseId": "638851848ea935100c4226ae",
              "term": "Fall",
              "year": 2011
          },
          {
              "courseId": "638851848ea935100c423ff8",
              "term": "Summer",
              "year": 2011
          },
          {
              "courseId": "638851848ea935100c424cb8",
              "term": "Fall",
              "year": 2012
          },
          {
              "courseId": "638851858ea935100c42a77a",
              "term": "Fall",
              "year": 2016
          },
          {
              "courseId": "638851858ea935100c42c008",
              "term": "Fall",
              "year": 2017
          },
          {
              "courseId": "638851868ea935100c42e620",
              "term": "Spring",
              "year": 2018
          },
          {
              "courseId": "638851868ea935100c42f3b0",
              "term": "Fall",
              "year": 2019
          }
      ]
  },
  {
      "profId": "638853b2a1471e4a637ffe51",
      "profName": "Patel, Sanjay J",
      "courseData": [
          {
              "courseId": "638851848ea935100c425b5c",
              "term": "Fall",
              "year": 2013
          },
          {
              "courseId": "638851858ea935100c428d61",
              "term": "Fall",
              "year": 2015
          },
          {
              "courseId": "638851868ea935100c42d9e4",
              "term": "Fall",
              "year": 2018
          },
          {
              "courseId": "638851868ea935100c42ffe4",
              "term": "Spring",
              "year": 2019
          },
          {
              "courseId": "638851868ea935100c430cf2",
              "term": "Fall",
              "year": 2020
          },
          {
              "courseId": "638851878ea935100c4327e1",
              "term": "Fall",
              "year": 2021
          }
      ]
  },
  {
      "profId": "638853b2a1471e4a637ff84a",
      "profName": "Lumetta, Steven S",
      "courseData": [
          {
              "courseId": "638851858ea935100c42747f",
              "term": "Fall",
              "year": 2014
          },
          {
              "courseId": "638851868ea935100c4318f8",
              "term": "Spring",
              "year": 2020
          }
      ]
  },
  {
      "profId": "638853b2a1471e4a637ff86a",
      "profName": "Kindratenko, Volodymyr",
      "courseData": [
          {
              "courseId": "638851868ea935100c430cf2",
              "term": "Fall",
              "year": 2020
          },
          {
              "courseId": "638851878ea935100c4327e1",
              "term": "Fall",
              "year": 2021
          },
          {
              "courseId": "638851878ea935100c4334ab",
              "term": "Spring",
              "year": 2021
          }
      ]
  }
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
      <ThemeProvider theme={theme}>
        {/* {router} */}
        {/* <CourseRatingsComponent profData={tempData} reviewList={["6396cae509273ce58e0cc134", "639001b951b4f01dd0bfef57", ]}/> */}
        <CoursePage subject="ECE" number={391}></CoursePage>
        {/* <ProfPage profName={'Bailey, Michael D'}></ProfPage> */}
      </ThemeProvider>
      {/* <GpaPage></GpaPage> */}
    </React.StrictMode>
  ); 
};

