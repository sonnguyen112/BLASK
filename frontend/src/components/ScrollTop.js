import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const ScrollTop = ({showBelow}) => {
    const [show, setShow] = useState(showBelow ? false : true);

    const handleScroll = () => {
        if (window.pageYOffset > showBelow){
            if (!show) setShow(true);
        }
        else{
            if (show) setShow(false);
        }
    }

    useEffect(() => {
        if (showBelow)
        {
            window.addEventListener(`scroll`, handleScroll);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    })

    const handleClick = () => 
    {
        window[`scrollTo`]({top: 0})
    };
    return (
        <Box>
            {show &&
            <IconButton onClick={handleClick} 
            sx={{
                zIndex: 2,
                position: 'fixed',
                bottom: '5vh',
                backgroundColor: 'primary.main',
                color: 'white',
                "&:hover, &.Mui-focusvisible":{
                    transition: '0.3s',
                    color: 'black',
                    backgroundColor: 'primary.main'
                },
                right: '2%'
                }}>
                <ExpandLessIcon/>
            </IconButton>
            }
        </Box>
    )
}

export default ScrollTop;
