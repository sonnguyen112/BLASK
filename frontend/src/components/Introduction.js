import * as React from 'react';
import Container  from '@mui/material/Container';
import Box  from '@mui/material/Box';
import Stack  from '@mui/material/Stack';
import homeImage from '../assets/images/image_home.png';
import Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';


function Introduction()
{
    const description = 'BLASK! is a game-based learning platform that makes it easy to create, share and play learning games or trivia quizzes in minutes.';
    return(
        <>
        <Box sx={{ bgcolor: '#cfe8fc', height:{xs:'800px', md:'500px'}}}>
            <Stack direction={{xs: 'column-reverse', md:'row'}} alignItems='center' justifyItems='center'>
                <Container>
                <Typography
                    variant="h3"
                    noWrap
                    align='center'
                    sx={{
                    m: 2,
                    pt: 7,
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
                    <Typography variant="body1" color="text.secondary" align='justify' 
                        sx={{ mt: 5,
                        mb: 6,
                        px: 6,
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        textDecoration: 'none',}}>
                        {description}
                    </Typography>
                    <Container align='center'>
                        <Button variant="outlined"
                        sx={{
                            position: 'static',
                            paddingY: '10px',
                            borderRadius: '20px', 
                            borderColor: 'primary.main',
                            borderWidth: '2px',
                            '&:hover *': {visibility:'visible', transition:'1s', color:'white', width:'40px', marginRight:'-15px'} ,
                            '&:hover':{transition:'1s', backgroundColor:'primary.main', color:'white', borderWidth: '2px'
                        }}} href='#instruction'>
                            Get Start
                            <TrendingFlatIcon sx={{visibility:'hidden', color:'primary.main', width:'0px', marginRight:'-2px'}}/>
                        </Button>
                    </Container>
                    
                </Container>

                <Box component='img' src={homeImage} sx={{height: {xs: 250, md:350}, mt:10, mx:2, '&:hover':{opacity: [1, 0.95, 0.9]}}} />
            </Stack>
        </Box>
        </>
    )
}

export default Introduction;