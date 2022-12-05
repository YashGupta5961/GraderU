import { React, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../../utils/api";

const Signup = () => {
  const [errState, setErrState] = useState("");

  const onSignup = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
      await api.post("/users/signup", {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        passwordConfirm: data.get("passwordConfirm"),
      });
      setErrState("");
    } catch (err) {
      setErrState(err.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "primary.background",
          color: "primary.contrastText",
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <div>Create an account</div>
        <Box component="form" onSubmit={onSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errState}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            sx={{
              "& label.Mui-focused": {
                color: "primary.contrastText",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.contrastText",
                },
              },
            }}
          />
          <TextField
            error={errState}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              "& label.Mui-focused": {
                color: "primary.contrastText",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.contrastText",
                },
              },
            }}
          />
          <TextField
            error={errState}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              "& label.Mui-focused": {
                color: "primary.contrastText",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.contrastText",
                },
              },
            }}
          />
          <TextField
            error={errState}
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password Confirm"
            type="password"
            id="passwordConfirm"
            autoComplete="current-passwordConfirm"
            sx={{
              "& label.Mui-focused": {
                color: "primary.contrastText",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.contrastText",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {errState ? <Alert severity="error">{errState}</Alert> : null}
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;