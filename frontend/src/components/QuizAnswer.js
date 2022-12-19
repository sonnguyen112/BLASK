
import {Box, Paper, Input} from "@mui/material"

import React from 'react'








const QuizAnswer = (props) => {
    const color = ["#cc0000", "#2986cc", "#e69138", "#38761d"]
    const id = ["0", "1", "2", "3"]
    console.log(props.correct === props.id)
    return (
        <Paper sx={{width:"40%", height:"100%", 
                  borderBottom:2, 
                  borderBlockColor: color[props.id],
                  backgroundColor:(props.answer.trim() !== "" ? color[props.id] : "#fff"),
                  display:"flex",
                  alignItems:"center"}}>
                  <Input 
                  id={`input-${id[props.id]}`}
                  value={props.answer}
                  disableUnderline multiline
                  inputProps={{ maxLength: 100 }}
                  placeholder="Add answer 1"
                  sx={{color:(props.answer.trim() !== "" ? "#fff" : "#000"), 
                  width:"85%", height:"75px", 
                  padding:1,
                    marginLeft:1}} 
                  onChange={props.handleAnswer}></Input>
                  <Box id={`select-${id[props.id]}`} 
                  sx={{height:"40px", width:"40px", 
                    backgroundColor:"white", 
                    borderRadius:"100px", 
                    
                    alignItems:"center",
                    justifyContent:"center",    
                    display:"flex",
                    "&:hover":{cursor: "pointer"}}}
                  onClick={props.handleCorrectAnswer}
                  >
                    <Box
                    sx={{height:"25px", width:'25px',
                    backgroundColor:color[props.id],
                    display:(props.correct === props.id ? "inline-block" : "none"),
                    borderRadius:"100px",
                    }}
                    />
                  </Box>
            </Paper>
    )
}

export default QuizAnswer;