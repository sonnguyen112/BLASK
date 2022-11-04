import React from "react";
import Box from "@mui/material/Box";
import Grid  from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FacebookIcon from '@mui/icons-material/Facebook';

import teamData from '../data/TeamData.js'

function Footer() {
    const teamElement = teamData.map(data => {
        return (
            <ListItem dense key={data.id}>
                <ListItemIcon>
                    <IconButton aria-label='facebook' href={data.link} target="_blank" sx={{color:'white'}}>
                        <FacebookIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemText 
                    primary={data.name}
                />
            </ListItem>
        )
    });
    return (
        <Box sx={{
                backgroundColor:'#263678',
                color: 'white',
                p: 5,
                fontSize: {xs: '12px', md: '14px'}
            }}>
            <Grid container spacing={2} justifyContent="space-around">
                <Grid item xs={4} md={4} lg={3}>
                    <Typography variant='body1'
                    sx={{
                        textTransform:'uppercase',
                        mb: '1em',
                        
                    }}>
                        About us
                    </Typography>
                    <List disablePadding>
                        <ListItemText sx={{marginBottom:'10px'}}>
                            <Typography variant='caption2'>
                                BLASK is an academic project developed based on <Link color="inherit" variant="body2" underline="hover" href='https://kahoot.com/' target="_blank">Kahoot!</Link> for our course CS300. It stands for the first letter of the members' names.
                            </Typography>
                        </ListItemText>
                        <ListItemText sx={{marginBottom:'15%'}}>
                        <Typography variant='caption2'>
                            Ho Chi Minh City University of Science
                        </Typography>
                        </ListItemText>
                        <ListItem >
                        <ListItemIcon>
                            <IconButton aria-label='github' href='https://github.com/sonnguyen112/BLASK' target="_blank" sx={{color:'white'}}>
                                <GitHubIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText 
                            primary='BLASK'
                        />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={4} md={4} lg={3} >
                <Typography variant='body1'
                    sx={{
                        textTransform:'uppercase',
                        mb: '1em',
                        
                    }}>
                        Information
                </Typography>
                <List disablePadding>
                    <ListItemText key='1'>
                        <Link color="inherit" variant="body2" underline="hover">Terms and conditions</Link>
                    </ListItemText>
                    <ListItemText key='2'>
                        <Link color="inherit" variant="body2" underline="hover">Privacy policy</Link>
                    </ListItemText>
                    <ListItemText key='3'>
                        <Link color="inherit" variant="body2" underline="hover">Student privacy policy</Link>
                    </ListItemText>
                    <ListItemText key='4'>
                        <Link color="inherit" variant="body2" underline="hover">Acceptable use policy</Link>
                    </ListItemText> 
                       
                </List>
                </Grid>
                <Grid item xs={4} md={4} lg={3} >
                <Typography variant='body1'
                    sx={{
                        textTransform:'uppercase',
                        mb: '1em',
                        
                    }}>
                        Team
                </Typography>
                <List disablePadding>
                    {teamElement}
                </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer;