import {
  IconButton,
  Stack,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";

import ListQuestionItem from "../components/ListQuestionItem";
import QuizAnswer from "../components/QuizAnswer";

import defaultImage from "../assets/images/Grey_thumb.png";

const ContentQuiz = (props) => {
  const timeSelect = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const pointSelect = [50, 60, 70, 80, 100, 110, 120, 150, 200, 250, 300];

  const defaultQuestion = {
    name: "Question",
    options: [
      { content: "", is_true: false },
      { content: "", is_true: false },
      { content: "", is_true: false },
      { content: "", is_true: false },
    ],
    imageQuestionUrl: defaultImage,
    point: 50,
    time: 10,
  };

  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    props.question[0].imageQuestionUrl
  );
  const [name, setName] = useState(props.question[0].name);
  const [options, setOptions] = useState(props.question[0].options);
  const [time, setTime] = React.useState(props.question[0].time);
  const [point, setPoint] = React.useState(props.question[0].point);

  useEffect(() => {
    setOptions(props.question[displayIndex].options);
    setSelectedImage(props.question[displayIndex].imageQuestionUrl);
    setName(props.question[displayIndex].name);
  }, [props, displayIndex]);

  const handleTime = (event) => {
    var newQuestion = [...props.question];
    newQuestion[displayIndex].time = event.target.value;
    setTime(event.target.value);
    props.setQuestion(newQuestion);
  };

  const handlePoint = (event) => {
    var newQuestion = [...props.question];
    newQuestion[displayIndex].point = event.target.value;
    setPoint(event.target.value);
    props.setQuestion(newQuestion);
  };

  const handleRemove = (id) => {
    var newQuestion = [...props.question];
    newQuestion.splice(id, 1);

    if (props.question.length !== 1) {
      if (displayIndex === id) {
        if (displayIndex === newQuestion.length) {
          setSelectedImage(newQuestion[id - 1].imageQuestionUrl);
          setName(newQuestion[id - 1].name);
          setOptions(newQuestion[id - 1].options);
          setTime(newQuestion[id - 1].time);
          setPoint(newQuestion[id - 1].point);
          setDisplayIndex(id - 1);
        } else {
          setSelectedImage(newQuestion[id].imageQuestionUrl);
          setName(newQuestion[id].name);
          setOptions(newQuestion[id].options);
          setTime(newQuestion[id].time);
          setPoint(newQuestion[id].point);
        }
      }
      props.setQuestion(newQuestion);
    }
  };

  const handleAdd = () => {
    var newQuestion = [...props.question];
    newQuestion.push(defaultQuestion);
    props.setQuestion(newQuestion);
  };

  const handleSelect = (id) => {
    if (id !== displayIndex) {
      setOptions(props.question[id].options);
      setName(props.question[id].name);
      setSelectedImage(props.question[id].imageQuestionUrl);
      setTime(props.question[id].time);
      setPoint(props.question[id].point);
      setDisplayIndex(id);
    }
  };

  const handleOptions = (event) => {
    var newQuestion = [...props.question];
    var newOptions = [...options];
    let id;
    switch (event.currentTarget.id) {
      case "input-0":
        id = 0;
        break;
      case "input-1":
        id = 1;
        break;
      case "input-2":
        id = 2;
        break;
      case "input-3":
        id = 3;
        break;
      default:
        id = 0;
    }
    newOptions[id].content = event.target.value;
    if (event.target.value.trim() === "") {
      newOptions[id].is_true = false;
    }
    newQuestion[displayIndex].options = newOptions;
    setOptions(newOptions);
    props.setQuestion(newQuestion);
  };

  const handleNameQues = (event) => {
    var newQuestion = [...props.question];
    newQuestion[displayIndex].name = event.target.value;
    setName(event.target.value);
    props.setQuestion(newQuestion);
  };

  const handleCorrectOptions = (event) => {
    let id;

    switch (event.currentTarget.id) {
      case "select-0":
        id = 0;
        break;
      case "select-1":
        id = 1;
        break;
      case "select-2":
        id = 2;
        break;
      case "select-3":
        id = 3;
        break;
      default:
        id = 0;
    }
    if (options[id].content.trim() !== "") {
      var newQuestion = [...props.question];
      var newOptions = [...options];
      newOptions[id].is_true = !newOptions[id].is_true;
      newQuestion[displayIndex].options = newOptions;
      setOptions(newOptions);
      props.setQuestion(newQuestion);
    }
  };

  return (
    <Stack sx={{ flexDirection: { md: "row", xs: "column-reverse" } }}>
      <Box
        sx={{
          width: { md: "20vw", xs: "100%" },
          height: { md: `calc(100vh - ${props.height}px)`, xs: "20vh" },
          display: "flex",
          flexDirection: { md: "column", xs: "row" },
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            maxHeight: { md: "90%", xs: "100%" },
            maxWidth: "95%",
            overflow: "auto",
            flexDirection: { xs: "row", md: "column" },
          }}
        >
          {props.question.map((q) => {
            const index = props.question.indexOf(q);
            return (
              <ListQuestionItem
                highlight={displayIndex}
                question={q}
                key={index}
                index={index}
                handleRemove={handleRemove}
                handleSelect={handleSelect}
              />
            );
          })}
        </Stack>
        <Button
          variant="contained"
          color="secondary"
          sx={{ display: { md: "inline", xs: "none" }, margin: 1 }}
          onClick={handleAdd}
        >
          Add question
        </Button>
        <IconButton
          color="secondary"
          component="label"
          sx={{ display: { md: "none", xs: "inline" }, margin: 1 }}
          onClick={handleAdd}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: { md: "80vw", xs: "100%" },
          height: { md: `calc(100vh - ${props.height}px)`, xs: "80vh" },
          borderLeft: { md: 2, xs: 0 },
          borderBottom: { md: 0, xs: 2 },
          color: "#9c27b0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: { md: "70%", xs: "100%" },
            my: 1,
          }}
        >
          <OutlinedInput
            placeholder="Please enter the question"
            inputProps={{ maxLength: 75 }}
            required
            color="secondary"
            value={name !== "Question" ? name : ""}
            sx={{ width: { md: "65%", xs: "40%" } }}
            onChange={handleNameQues}
          />
          <FormControl sx={{ width: { xs: "20%", md: "12%" } }}>
            <InputLabel id="time-select-label" color="secondary">
              <AccessTimeIcon />
            </InputLabel>
            <Select
              labelId="time-select-label"
              color="secondary"
              value={time}
              defaultValue={timeSelect[0]}
              label="Time"
              onChange={handleTime}
            >
              {timeSelect.map((t) => {
                return (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ width: { xs: "20%", md: "12%" } }}>
            <InputLabel color="secondary" id="point-select-label">
              <SportsScoreIcon />
            </InputLabel>
            <Select
              labelId="point-select-label"
              color="secondary"
              defaultValue={pointSelect[0]}
              value={point}
              label="Point"
              onChange={handlePoint}
            >
              {pointSelect.map((t) => {
                return (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "150px", md: "250px" },
            height: { xs: "108px", md: "180px" },
            backgroundImage: `url(${selectedImage})`,
            backgroundRepeat: "no-repeat",
            borderRadius: "15px",
            backgroundSize: "cover",
            "&:hover": { cursor: "pointer" },
            "&:hover .new-icon": {
              display: selectedImage !== defaultImage ? "inline-block" : "none",
            },
          }}
          component="label"
        >
          <AddPhotoAlternateIcon
            sx={{
              display: selectedImage === defaultImage ? "inline-block" : "none",
              fontSize: "60px",
              color: "#fff",
            }}
          />
          <AutorenewIcon
            className="new-icon"
            sx={{
              display: "none",
              fontSize: "40px",
              color: "#fff",
            }}
          />
          <input
            type="file"
            accept="image/*"
            name="myImage"
            hidden
            onChange={(event) => {
              if (event.target.files[0]) {
                const img = URL.createObjectURL(event.target.files[0]);
                var newQuestion = [...props.question];
                newQuestion[displayIndex].imageQuestionUrl = img;
                setSelectedImage(img);
                props.setQuestion(newQuestion);
                console.log("img", img);
              }
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "40%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <QuizAnswer
              id={0}
              options={options[0]}
              handleOptions={handleOptions}
              handleCorrectOptions={handleCorrectOptions}
            />
            <QuizAnswer
              id={1}
              options={options[1]}
              handleOptions={handleOptions}
              handleCorrectOptions={handleCorrectOptions}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "40%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <QuizAnswer
              id={2}
              options={options[2]}
              handleOptions={handleOptions}
              handleCorrectOptions={handleCorrectOptions}
            />
            <QuizAnswer
              id={3}
              options={options[3]}
              handleOptions={handleOptions}
              handleCorrectOptions={handleCorrectOptions}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default ContentQuiz;
