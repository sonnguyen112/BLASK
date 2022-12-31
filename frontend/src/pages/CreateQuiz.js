import {
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CreateBar from "../components/CreateBar";
import ContentQuiz from "../components/ContentQuiz";
import defaultImage from "../assets/images/Grey_thumb.png";

const CreateQuiz = (props) => {
  const [height, setHeight] = useState(0);
  const [title, setTitle] = useState("");
  const [imgQuiz, setImgQuiz] = useState("");
  let navigate = useNavigate();
  const location = useLocation();

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
  const [edit, setEdit] = useState(false);
  const [question, setQuestion] = useState([defaultQuestion]);
  const [open, setOpen] = useState(false);
  const [messageError, setMessageError] = useState({
    title: "",
    quizAns: "",
    quizName: "",
    quizCorrect: "",
  });
  useEffect(() => {
    if (location.state) {
      setEdit(location.state.edit);
      const list_ques = location.state.quiz.list_question;
      const list_opts = location.state.quiz.list_option;
      const ques = [];
      if (list_ques.length !== 0) {
        list_ques.map((q) => {
          if (list_opts.length !== 0) {
            const opt = list_opts.filter((o) => o.question === q.id);
            var optionsTmp = [];
            opt.map((o) => {
              optionsTmp.push({ content: o.content, is_true: o.is_true });
            });
            while (optionsTmp.length < 4) {
              optionsTmp.push({ content: "", is_true: false });
            }
            ques.push({
              name: q.description,
              imageQuestionUrl: q.image_question_url,
              options: optionsTmp,
              time: q.num_of_second,
              point: q.score,
            });
          }
        });
      }
      console.log("edit", ques);
      setQuestion(ques);
      setImgQuiz(location.state.quiz.imageQuizUrl);
      setTitle(location.state.quiz.title);
    }
  }, [location]);

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const quizCreate = {
      title: title,
      description: "No description",
      questions: question,
    };

    if (imgQuiz.trim() !== "") {
      quizCreate.imageQuizUrl = imgQuiz.substring(
        imgQuiz.search("base64,") + 7
      );
    }
    var checkError = false;
    var message = { title: "", quizAns: "", quizName: "", quizCorrect: "" };

    if (quizCreate.title.trim() === "") {
      checkError = true;
      message.title = "Please set the title of quiz.";
    }
    for (let i = 0; i < quizCreate.questions.length; i++) {
      quizCreate.questions[i].imageQuestionUrl = quizCreate.questions[
        i
      ].imageQuestionUrl.substring(
        quizCreate.questions[i].imageQuestionUrl.search("base64,") + 7
      );

      quizCreate.questions[i].options = quizCreate.questions[i].options.filter(
        (opt) => opt.content.trim() !== ""
      );

      let count = quizCreate.questions[i].options.length;
      let correct = quizCreate.questions[i].options.filter(
        (opt) => opt.is_true === true
      ).length;

      if (count < 2) {
        checkError = true;
        message.quizAns = message.quizAns.concat(`${i + 1} `);
      }
      if (correct < 1) {
        checkError = true;
        message.quizCorrect = message.quizCorrect.concat(`${i + 1} `);
      }
      if (quizCreate.questions[i].name.trim() === "") {
        checkError = true;
        message.quizName = message.quizName.concat(`${i + 1} `);
      }
    }
    if (checkError) {
      console.log(message);
      setOpen(checkError);
      setMessageError(message);
    } else {
      fetchCreateQuiz(quizCreate);
    }
  };
  async function fetchCreateQuiz(quizCreate) {
    const response = await fetch(
      "http://localhost:8000/quiz/api/create_quiz/",
      {
        mode: "cors",
        method: "POST",
        headers: [
          ["Content-Type", "application/json"],
          ["Authorization", "token " + props.token],
        ],
        body: JSON.stringify(quizCreate),
      }
    );
    console.log(quizCreate);
    navigate("/library");
  }

  return (
    <Box>
      <CssBaseline />
      <CreateBar
        setHeight={setHeight}
        height={height}
        title={title}
        handleTitle={handleTitle}
        setImgQuiz={setImgQuiz}
        handleSave={handleSave}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="secondary">
          {"All question need to be completed"}
        </DialogTitle>
        <DialogContent>
          {messageError.title.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              Please type the title of quiz.
            </DialogContentText>
          )}
          {messageError.quizName.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              Please type the name of question {messageError.quizName}.
            </DialogContentText>
          )}
          {messageError.quizAns.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              Please enter at least two answers of question{" "}
              {messageError.quizAns}.
            </DialogContentText>
          )}
          {messageError.quizCorrect.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              Please choose at least one correct answer of question{" "}
              {messageError.quizCorrect}.
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
      <ContentQuiz
        height={height}
        question={question}
        setQuestion={setQuestion}
      />
    </Box>
  );
};

export default CreateQuiz;
