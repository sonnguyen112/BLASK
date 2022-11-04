import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function CardHome(data) {
    const color = data.id===1 ? 'primary' : (data.id===2 ? 'error' : 'success')
    const width = [320, 400, 600];
    const height = [140, 280, 300];
    return (
        <Card sx={{ maxWidth: {xs:width[2], md:width[0], xl:width[1]}, height:{xs:height[1], xl:height[1], md:height[2]} , mb: (data.id===2 ? {md:10} : 0), borderRadius: '16px'}} >
          <Box sx={{width: {xs:width[2], md:width[0], xl:width[1]}, height:height[0]}} backgroundColor={color + '.main'}>
          <CardMedia component='video' image={data.video} height={height[0]} autoPlay loop muted preload='true'/>  
          </Box>    
          <Box textAlign='center'>
            <Button size="small" color={color} sx={{mt:2}}>{data.name}</Button>
          </Box>
          <CardContent>
          <Typography variant="body1" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        </Card>
    )

}

export default CardHome;