
import {CardContent, CardMedia, Card, IconButton, Box, Typography, ListItem} from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

const ListQuestionItem = (props) =>{
    const deleteItem = () => {
        props.handleRemove(props.index)
    }

    const selectItem = () => {
      props.handleSelect(props.index)
    }
    return (
      <ListItem disableGutters sx={{p:{md:1, xs:0}}}>
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"start"}}>
            <Box sx={{width:"10%"}}>
            <IconButton color="secondary" key={props.index} sx={{width:"inherit", position:"relative", bottom:"-70%"}} onClick={deleteItem}>
              <DeleteIcon fontSize="small"/>
            </IconButton>
            </Box>
            <Box sx={{width:"90%", display:"flex", flexDirection:"column"}}  onClick={selectItem}>
              <Typography variant="subtitle2" sx={{ width:"130px", fontWeight:"700", margin:{md:1, xs:0}}} >
                {props.index + 1} Quiz
              </Typography>
              <Card sx={{height:{xs:"100px", md:"120px"}, width:{md:"180px", xs:"130px"}, border: (props.highlight === props.index ? 2 : 0), borderColor:"secondary.main"}}>
                <CardMedia
                  component="img"
                  sx={{height:{md:"60px", xs:"40px"}}}
                  image={props.question.img}
                />
                 <CardContent>
                 <Typography variant="body2" component="div" 
                 sx ={{textAlign:"center"}}>
                    {props.question.name.length > 15 ? props.question.name.slice(0,15).concat("...") : props.question.name}
                  </Typography>
                 </CardContent>
              </Card>
            </Box>
        </Box>
      </ListItem>
    )
  }

  export default ListQuestionItem;