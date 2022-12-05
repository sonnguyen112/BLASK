import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        BLASK
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(props) {
  let navigate = useNavigate(); 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    props.setToken("1312002")
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
       <Container component="main" className="wrapper" maxWidth="false" disableGutters >
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
        <div className="div"><span className="dot"></span></div>
      <Container maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 3,
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:'#ffffff',
            borderRadius: 5
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Container>
    </ThemeProvider>
  );
}