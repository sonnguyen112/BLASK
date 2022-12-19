import {Box, AppBar, Toolbar, Typography, Button, CssBaseline, Divider, OutlinedInput, FormControl} from "@mui/material"
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'

import ContentQuiz from "../components/ContentQuiz"

const CreateQuiz = () => {
  
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  },[height])

 

  const ToolBar = () => 
  {
    return(
        <AppBar position="static" sx={{backgroundColor:"#fff"}} ref={ref}>
          <Toolbar id="back-to-top-anchor" sx={{p:0.5}}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 , color:'#9C27B0'}} />
            
            <Typography component={Link} to='/'
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#9C27B0',
                textDecoration: 'none',
              }}
            >
              BLASK
            </Typography>
            <Divider orientation="vertical" variant="middle" sx={{display:{xs:'none', md: 'inline'}, mr:{xs:0, md:2}}} flexItem/>
            <Typography
                variant="h5"
                noWrap
                component={Link} to='/' 
                sx={{
                mr: 0,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color:'#9C27B0',
                textDecoration: 'none',
                }}
            >
                BLASK
            </Typography>
            <Box sx={{flexGrow:1}}>
            <FormControl sx={{ width: {md:'25ch',xs:'18ch'}}}>
              <OutlinedInput placeholder="Please enter title" required color="secondary"/>
            </FormControl>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button variant="contained" sx={{display:{xs:"none", md:"inline"},backgroundColor:"#dcdcdc", color:"#000", mr:1}}>Exit</Button>
              <Button variant="contained" color="secondary">Save</Button>
            </Box>
          </Toolbar>
        </AppBar>
    )
  };

  
    return (<Box>
        <CssBaseline />
        <ToolBar/>
        <ContentQuiz height={height}/>
    </Box>)
  };
  
  export default CreateQuiz;