import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container  from '@mui/material/Container';
import Grid  from '@mui/material/Grid';
import cardData from '../data/HomeData';
import CardHome from '../components/CardHome'
import { Box } from '@mui/material';

function Instruction()
{
    const cardElement = cardData.map(data => {
        return (
          <Grid item m={3}>
            <CardHome {...data}/>
          </Grid>
        )
    })
    return(
      <div id='instruction'>
        <Box>
        <Container maxWidth="xl" display='flex'>
          
            <Typography
                      variant="h5"
                      noWrap
                      align='center'
                      sx={{
                      mt: 5,
                      mb: 6,
                      pt: 2,
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                      }}
                  >
                      How does BLASK! work?
            </Typography>
          <Grid container spacing={{xs:1, md:3, xl: 5}} sx={{ flexGrow: 1, mt:5}}  alignItems="center" direction='row' justifyContent="space-evenly">
            {cardElement}
          </Grid>
        </Container>
    </Box>
    </div>
    )
}

export default Instruction;