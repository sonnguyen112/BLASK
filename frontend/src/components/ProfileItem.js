import { Box, TextField, Typography } from "@mui/material";
import React from "react";
const ProfileItem = (props) => {
  const info = ["Username", "First name", "Last name", "Email"];
  const handleChange = (event) => {
    props.onChangeProfile(event.target.value, props.index);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            width: "15%",
            marginLeft: 4,
          }}
        >
          {info[props.index]}
        </Typography>

        <TextField
          disabled={props.edit ? false : true}
          defaultValue={props.profile}
          sx={{ width: "70%" }}
          onChange={handleChange}
        ></TextField>
      </Box>
    </Box>
  );
};

export default ProfileItem;
