import { Box, Paper, Input } from "@mui/material";

import React from "react";

const QuizAnswer = (props) => {
  const color = ["#cc0000", "#2986cc", "#e69138", "#38761d"];
  return (
    <Paper
      elevation={5}
      sx={{
        width: "40%",
        height: "100%",
        borderBottom: 2,
        borderBlockColor: color[props.id],
        backgroundColor:
          props.options.content.trim() !== "" ? color[props.id] : "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Input
        id={`input-${props.id}`}
        value={props.options.content}
        disableUnderline
        multiline
        inputProps={{ maxLength: 100 }}
        placeholder={`Add answer ${props.id + 1}`}
        sx={{
          color: props.options.content.trim() !== "" ? "#fff" : "#000",
          width: "85%",
          height: "75px",
          padding: 1,
          marginLeft: 1,
        }}
        onChange={props.handleOptions}
      ></Input>
      <Box
        id={`select-${props.id}`}
        sx={{
          height: "40px",
          width: "40px",
          backgroundColor: "white",
          borderRadius: "100px",

          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          "&:hover": { cursor: "pointer" },
        }}
        onClick={props.handleCorrectOptions}
      >
        <Box
          sx={{
            height: "25px",
            width: "25px",
            backgroundColor: color[props.id],
            display: props.options.is_true ? "inline-block" : "none",
            borderRadius: "100px",
          }}
        />
      </Box>
    </Paper>
  );
};

export default QuizAnswer;
