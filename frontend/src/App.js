import { React } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

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
      <Login />
      {/* <Signup /> */}
    </ThemeProvider>
  );
};

export default App;
