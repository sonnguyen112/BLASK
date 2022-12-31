import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import UploadIcon from "@mui/icons-material/Upload";
const Profile = (props) => {
  const [width, setWidth] = useState(0);
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState(props.profile);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
  }, [width]);
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: `calc(100vh - ${props.height}px)`,
        background: "linear-gradient(90deg, #0529ad, #71d6fb)",
        backgroundSize: "200% 200%",
        animation: "gradient 15s ease infinite",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Paper sx={{ width: "90vw", height: "75vh", m: "auto" }} elevation={16}>
        <Box
          sx={{
            width: "90vw",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            ref={ref}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mx: 4,
                width: "180px",
                height: "180px",
                backgroundImage: `url(${props.profile.avatar})`,
                backgroundRepeat: "no-repeat",
                borderRadius: "30px",
                backgroundSize: "cover",
              }}
            />
            <Button
              disabled={edit ? false : true}
              variant="contained"
              sx={{ mt: 2 }}
              endIcon={<UploadIcon />}
            >
              Change
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2, display: edit ? "none" : "inline-block" }}
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                display: edit ? "inline-block" : "none",
                backgroundColor: "#ffffff",
                color: "#1976d2",
              }}
              onClick={() => {
                setEdit(false);
              }}
            >
              Save
            </Button>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: `calc(90vw - ${width}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderLeft: 2,
              borderColor: "#1976d2",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "15%",
                }}
              >
                <Typography variant="h6" sx={{ marginY: 2.25 }}>
                  Username
                </Typography>
                <Typography variant="h6" sx={{ marginY: 2.25 }}>
                  First Name
                </Typography>
                <Typography variant="h6" sx={{ marginY: 2.25 }}>
                  Last Name
                </Typography>
                <Typography variant="h6" sx={{ marginY: 2.25 }}>
                  Email
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "60%",
                }}
              >
                <TextField
                  disabled={edit ? false : true}
                  sx={{ marginTop: 1.5, width: "100%" }}
                  defaultValue={profile.username}
                ></TextField>
                <TextField
                  disabled={edit ? false : true}
                  sx={{ marginTop: 1.5, width: "100%" }}
                  defaultValue={profile.firstname}
                ></TextField>
                <TextField
                  disabled={edit ? false : true}
                  sx={{ marginTop: 1.5, width: "100%" }}
                  defaultValue={profile.lastname}
                ></TextField>
                <TextField
                  disabled={edit ? false : true}
                  sx={{ marginTop: 1.5, width: "100%" }}
                  defaultValue={profile.email}
                ></TextField>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
