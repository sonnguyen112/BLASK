import * as React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        BLASK
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(props) {
  let navigate = useNavigate();
  const [remember, setRemember] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    sendDataSignup();

    function sendDataSignup() {
      const signInData = {
        username: username,
        password: password,
      };
      setLoading(true);

      async function fetchLogin() {
        const response = await fetch("http://localhost:8000/auth/api/sign_in", {
          mode: "cors",
          method: "POST",
          headers: [["Content-Type", "application/json"]],
          body: JSON.stringify(signInData),
        });

        if (response.status === 200) {
          const json = await response.json();
          const profile = {
            username: json.username,
            firstname: json.first_name,
            lastname: json.last_name,
            email: json.email,
            avatar: `http://localhost:8000${json.avatar}`,
          };
          props.setToken(json.token);
          console.log(profile);
          props.setProfile(profile);
          if (remember) {
            window.localStorage.setItem("token", json.token);
            window.localStorage.setItem("profile", JSON.stringify(profile));
            window.localStorage.setItem("remember", "1");
          } else {
            window.sessionStorage.setItem("token", json.token);
            window.sessionStorage.setItem("profile", JSON.stringify(profile));
          }
          setLoading(false);
          navigate("/");
        } else {
          setLoading(false);
          setErrorMessage(true);
        }
      }
      fetchLogin();
    }
  };

  const handleRemember = (event) => {
    setRemember(event.target.checked);
    console.log(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        className="wrapper"
        maxWidth="false"
        disableGutters
      >
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <div className="div">
          <span className="dot"></span>
        </div>
        <Container
          maxWidth="sm"
          sx={{ minHeight: `calc(100vh - ${props.height}px)` }}
        >
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 3,
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete=""
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={handleRemember}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  setLoading(true);
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {errorMessage && (
                <Alert
                  severity="error"
                  sx={{ m: 2, width: { md: "400px", xl: "600px" } }}
                >
                  <AlertTitle>Error</AlertTitle>
                  <Typography variant="body2">
                    Username or Password are not correct
                  </Typography>
                  <Typography variant="body2">
                    — <strong>Please type again!</strong>
                  </Typography>
                </Alert>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {isLoading && <LinearProgress sx={{ mt: 2 }} />}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Container>
    </ThemeProvider>
  );
}
