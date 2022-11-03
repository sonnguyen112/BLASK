import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container  from '@mui/material/Container';
import Grid  from '@mui/material/Grid';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import cardData from '../data/HomeData';
import Box from '@mui/material/Box';

const Home = () => {

  const cardElement = cardData.map(data => {
      const color = data.id===1 ? 'primary' : (data.id===2 ? 'error' : 'success')
      return (
        <Grid item >
        <Card sx={{ maxWidth: {xs:500, md:250}, height: 280 , mb: (data.id===2 ? {md:10} : 0), borderRadius: '16px'}} alignItems='center'>
          <Box sx={{width: {xs:500, md:250}, height: 140}} backgroundColor={color + '.main'}>
          <CardMedia component='video' image={data.video} height='140' autoPlay loop muted preload/>  
          </Box>    
          <Box textAlign='center'>
            <Button size="small" color={color} sx={{mt:2}}>{data.name}</Button>
          </Box>
          <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        </Card>
        </Grid>
      )
  })
  return (
    <>
    <Container maxWidth="xl" color="primary light" display='flex'>
    <Typography
              variant="h5"
              noWrap
              align='center'
              sx={{
              m: 2,
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

      <Grid container spacing={{xs:1, md:3}} sx={{ flexGrow: 1, mt:5}}  alignItems="center" direction='row' justifyContent="space-evenly">
        {cardElement}
      </Grid>
    </Container>
    </>
    );
  };
  
  export default Home;