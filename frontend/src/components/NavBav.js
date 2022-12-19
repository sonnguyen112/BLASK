import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../style/navbav.css'



const pages = ['Home', 'Library', 'Reports', 'Minigame'];
const settings = ['Profile', 'Sign out'];

function ResponsiveAppBar(props) {

    let navigate = useNavigate();
    const theme = createTheme({
            palette: {
            mode: 'light',
            },
        });

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleLogin = () => {
        
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleClickOnUserMenu = (event) => {
        
        switch(settings.indexOf(event.target.innerText))
        {
            case 0:
                break;
            case 1:
                props.setToken("");
                navigate('/')
                break;
            default:
                break;
        }
        handleCloseUserMenu();
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static">
        <Container maxWidth="xl" color="primary light" >
            <Toolbar id="back-to-top-anchor" disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            
          <Typography component={Link} to='/'
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLASK
          </Typography>
          <Divider orientation="vertical" variant="middle" sx={{display:{xs:'none', md: 'flex'}}} flexItem/>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                    <MenuItem component={Link} to='/' key={pages[0]} onClick={handleCloseNavMenu}>
                        <HomeIcon sx={{ mr: 1 , fontSize:'medium'}} />
                        <Typography textAlign="center">{pages[0]}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to='library' key={pages[1]} onClick={handleCloseNavMenu}>
                        <LibraryBooksIcon sx={{ mr: 1 , fontSize:'medium'}} />
                        <Typography textAlign="center">{pages[1]}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to='reports' key={pages[2]} onClick={handleCloseNavMenu}>
                        <AnalyticsIcon sx={{ mr: 1 , fontSize:'medium'}} />
                        <Typography textAlign="center">{pages[2]}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to='minigame' key={pages[3]} onClick={handleCloseNavMenu}>
                        <SportsEsportsIcon sx={{ mr: 1 , fontSize:'medium'}} />
                        <Typography textAlign="center">{pages[3]}</Typography>
                    </MenuItem>

                </Menu>
            </Box>
            <Typography
                variant="h5"
                noWrap
                component={Link} to='/'
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                BLASK
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button 
                    className='underline-button'
                    component={Link} to='/home'
                    key={pages[0]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                >
                    <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize:'medium'}} />
                    {pages[0]}
                </Button>
                <Button 
                    className='underline-button'
                    key={pages[1]}
                    component={Link} to='/library'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                >
                    <LibraryBooksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize:'medium' }} />
                    {pages[1]}
                </Button>
                <Button 
                    className='underline-button'
                    component={Link} to='/reports'
                    key={pages[2]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                >
                    <AnalyticsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize:'medium'}} />
                    {pages[2]}
                </Button>
                <Button
                    className='underline-button'
                    component={Link} to='/minigame'
                    key={pages[3]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                >
                    <SportsEsportsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , fontSize:'medium'}} />
                    {pages[3]}
                </Button>
            </Box>


            {props.token.trim() !== "" ? (<>
            <Button 
            component={Link}
            to = '/create-quiz'
            color='secondary' 
            variant='contained'
            sx={{ my: 2, display: 'flex'}}>Create</Button>
            <Button component={Link} to='*' variant="contained" sx={{m: 1, backgroundColor:"#e3f2fd", color:"#000"}}>Play</Button>

            <Box sx={{ flexGrow: 0 }}>
                
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/images/image_home.png" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                
                    <MenuItem component={Link} to='profile' key={settings[0]} onClick={handleClickOnUserMenu}>
                        <AccountCircleIcon color='success' sx={{ mr: 1 }}/>            
                        <Typography textAlign="center" >{settings[0]}</Typography>
        
                    </MenuItem>
                    <Divider/>
                    <MenuItem key={settings[1]} onClick={handleClickOnUserMenu}>
                        <LogoutIcon sx={{mr: 1 , color: red[500]}} /> 
                        <Typography textAlign="center" >{settings[1]}</Typography>
                    </MenuItem>
                
                </Menu>
            </Box></>)
            : <Box sx={{ flexGrow: 0 }}>
                <Button component={Link} to='*' variant="contained" sx={{m: 1, backgroundColor:"#e3f2fd", color:"#000"}}>Play</Button>
                <Button component={Link} to='login' variant="text" color="inherit" onClick={handleLogin}>Log In</Button>
            </Box>}
            </Toolbar>
        </Container>
        </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;
