import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert'
import AlertTitle  from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../style/signup.css'


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

export default function SignUp() {
    const [isLoading, setLoading] = React.useState(false)
    const pattern_email = /(\S+@\w+\.\w+)/;
    const pattern_special_character = /(\d)/;

    const [errorMessage, setErrorMessage] = React.useState({name: '', password: '', email: '', check: false})

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get('firstName');
    const lastname = data.get('lastName');
    const username = data.get('username');
    const email = data.get('email');
    const password_1 = data.get('password_1');
    const password_2 = data.get('password_2');

    let message = {
      name: '',
      password: '',
        email: '',
        check: false
    }
    if (firstname.length === 0 || lastname.length === 0)
    {
      message.check = true
      message.name = 'Name cannot be empty.'
    }
    else if (pattern_special_character.test(firstname) || pattern_special_character.test(lastname))
    {
      message.check = true
      message.name = 'Name cannot contain any special characters.'
    }

    if (password_1.length < 6)
    {
      message.check = true
      message.password = 'Password should be large than 6 character.\n'
    }
    else if (password_1.localeCompare(password_2) !== 0)
    {
      message.check = true
      message.password = 'Your passwords are not match.\n'
    }

    if (!pattern_email.test(email))
    {
      message.check = true
      message.email = 'Your email is incorrect.\n'
    }

    setErrorMessage(message)

    if (!message.check)
    {
        sendDataSignup()
    }
    else{
      setLoading(false)
    }

    function sendDataSignup()
    {
      const signUpData = {
        "username" : username,
        "email" : email,
        "password" : password_1,
        "password_confirm" : password_2,
        "firstname" : firstname,
        "lastname": lastname
      }
      setLoading(true)
      fetch("http://localhost:8000/auth/api/sign_up",  {
            mode: 'cors',
            method: "POST",
            headers: [['Content-Type', 'application/json']],  
            body: JSON.stringify(signUpData),
        })
            .then((response) =>
            { 
              response.json()
            })
            .then((data) => 
            {
              setLoading(false)
              console.log(data)
            });
    }
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
      <Container maxWidth="sm" >
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete=""
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_1"
                  label="Password"
                  type="password"
                  id="password_1"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_2"
                  label="Confirm Password"
                  type="password"
                  id="password_2"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                setLoading(true)
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            
            {errorMessage.check && <Alert severity="error" sx={{m:2, width: {md: '400px', xl: '600px'}}}>
                <AlertTitle>Error</AlertTitle>
                <Typography  variant='body2'>
                {errorMessage.name}
                </Typography>
                <Typography  variant='body2'>
                {errorMessage.password}
                </Typography>
                <Typography  variant='body2'>
                {errorMessage.email}
                </Typography>
                <Typography variant='body2'>
                — <strong>Please type again!</strong>   
                </Typography>
            </Alert>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
            {isLoading &&<LinearProgress sx={{mt:2}}/>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Container>

      
    </ThemeProvider>
  );
}