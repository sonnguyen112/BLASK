import {IconButton,Stack, Box, Button, FormControl, OutlinedInput} from "@mui/material"

import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React, { useState} from 'react'


import ListQuestionItem from "../components/ListQuestionItem"
import QuizAnswer from "../components/QuizAnswer";

import defaultImage from "../assets/images/Grey_thumb.png"


const ContentQuiz = (props) =>
{

  const defaultQuestion = {
    name: "Question",
    answer:["","","",""],
    img:defaultImage,
    correct:-1
  }
  const [question, setQuestion] = useState([defaultQuestion])
  const [displayIndex, setDisplayIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [name, setName] = useState("Question");
  const [correct, setCorrect] = useState(-1)
  const [answer, setAnswer] = useState(["","","",""])


  const handleRemove = (id) =>{
    var newQuestion = [...question]
    newQuestion.splice(id, 1)
    
    if (question.length !== 1)
    {  
      if (displayIndex === id)
      {  
        if (displayIndex === newQuestion.length)
        {
          setSelectedImage(newQuestion[id-1].img)
          setName(newQuestion[id-1].name)
          setAnswer(newQuestion[id-1].answer)
          setCorrect(newQuestion[id-1].correct)
          setDisplayIndex(id-1)
        }
        else{
          setSelectedImage(newQuestion[id].img)
          setName(newQuestion[id].name)
          setAnswer(newQuestion[id].answer)
          setCorrect(newQuestion[id].correct)
        }
        
        console.log(id)
      }
      setQuestion(newQuestion);
    }
    
  }

  const handleAdd = () => {
    var newQuestion = [...question]
    newQuestion.push(defaultQuestion)
    setQuestion(newQuestion)
  }
  console.log(answer)

  const handleSelect = (id) => {
    if (id !== displayIndex){
      setAnswer(question[id].answer);
      setName(question[id].name);
      setSelectedImage(question[id].img)
      setCorrect(question[id].correct)
      setDisplayIndex(id)
    }
  }

  const handleAnswer = (event) => {
    var newQuestion = [...question]
    var newAnswer = [...answer]
    let id
    switch(event.target.id)
    {
    case "input-0":
      id = 0
      break
    case "input-1":
      id = 1
      break
    case "input-2":
      id = 2
      break
    case "input-3":
      id = 3
      break
    default:
      id = 0
      
    }
    newAnswer[id] = event.target.value
    newQuestion[displayIndex].answer = newAnswer
    setAnswer(newAnswer)
    setQuestion(newQuestion)
    
  }


  const handleNameQues = (event) => {
      var newQuestion = [...question]
      newQuestion[displayIndex].name = event.target.value
      setName(event.target.value);
      setQuestion(newQuestion)
  }

  const handleCorrectAnswer = (event) =>{
    let id
    switch(event.target.id)
    {
    case "select-0":
      id = 0
      break
    case "select-1":
      id = 1
      break
    case "select-2":
      id = 2
      break
    case "select-3":
      id = 3
      break
    }
    if (answer[id].trim() !== ""){
      console.log(id)
      var newQuestion = [...question]
      newQuestion[displayIndex].correct = id
      setCorrect(id)
      setQuestion(newQuestion)
    }
  }
  

    return (
      <Stack sx={{flexDirection:{md:"row", xs:"column-reverse"}}}>
        <Box sx={{
          width:{md:'20vw', xs:"100%"} ,height:{md:`calc(100vh - ${props.height}px)`, xs:"20vh"}, 
          display:"flex",
          flexDirection:{md:"column", xs:"row"}, 
          alignItems:"center"}}>
          <Stack sx={{maxHeight:{md:"90%", xs:"100%"},  maxWidth:"95%", overflow:'auto', flexDirection:{xs:"row",md:"column"}}} >
            {question.map((q) => {
              const index = question.indexOf(q)
              return (
                <ListQuestionItem highlight={displayIndex} question={q} key={index} index={index} handleRemove={handleRemove} handleSelect={handleSelect}/>
              )
            })}
          </Stack>
          <Button variant="contained" color="secondary" sx={{display:{md:"inline", xs:"none"}, margin:1}} onClick={handleAdd}>Add question</Button>
          <IconButton color="secondary" 
            component="label"
            sx={{display:{md:"none", xs:"inline"}, margin: 1}}
            onClick={handleAdd}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
        <Box sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"space-evenly",
          width:{md:'80vw', xs:"100%"} ,
          height:{md:`calc(100vh - ${props.height}px)`, xs:"80vh"}, 
          borderLeft:{md:2, xs:0},
          borderBottom:{md:0,xs:2},
          color:"#9c27b0"
          }}>
            <FormControl sx={{ width:"70%"}}>
              <OutlinedInput placeholder="Please enter the question" 
              inputProps={{ maxLength: 75 }}
              required color="secondary" value={name !== "Question" ? name : ""} onChange={handleNameQues}/>
            </FormControl>
            <Box sx={{
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              width:"250px",
              height:"180px",
              backgroundImage:`url(${selectedImage})`,
              backgroundRepeat: 'no-repeat',
              borderRadius:"15px",
              backgroundSize:"cover",
              "&:hover":{cursor: "pointer"},
              "&:hover .new-icon":{
                display:(selectedImage !== defaultImage ? "inline-block" : "none")}
              }}
              component="label">
                <AddPhotoAlternateIcon sx={{display:(selectedImage === defaultImage ? "inline-block" : "none"), fontSize:"60px", color:"#fff"}}/>
                <AutorenewIcon className="new-icon" sx={{
                  display:"none",
                  fontSize:"40px", color:"#fff"}}/>
                <input
                type="file"
                accept="image/*"
                name="myImage"
                hidden
                onChange={(event) => {
                  console.log(event.target.files[0])
                  if (event.target.files[0]){
                    const img = URL.createObjectURL(event.target.files[0])
                    var newQuestion = [...question]
                    newQuestion[displayIndex].img = img
                    setSelectedImage(img);
                    setQuestion(newQuestion)
                  }
                }}
                onClick={(event)=> { 
                  event.target.value = null
                }}
              />
            </Box>
         <Box sx={{width:"100%", height:"250px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-evenly"}}>
            <Box sx={{width:"100%", height:"40%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
            <QuizAnswer id={0} correct={correct} answer={answer[0]} handleAnswer={handleAnswer} handleCorrectAnswer={handleCorrectAnswer}/>
            <QuizAnswer id={1} correct={correct} answer={answer[1]} handleAnswer={handleAnswer} handleCorrectAnswer={handleCorrectAnswer}/>
            </Box>
            <Box sx={{width:"100%", height:"40%",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
            <QuizAnswer id={2} correct={correct} answer={answer[2]} handleAnswer={handleAnswer} handleCorrectAnswer={handleCorrectAnswer}/>
            <QuizAnswer id={3} correct={correct} answer={answer[3]} handleAnswer={handleAnswer} handleCorrectAnswer={handleCorrectAnswer}/>
            </Box>
            
         </Box>
        </Box>
      </Stack>
    )
  }

  export default ContentQuiz;