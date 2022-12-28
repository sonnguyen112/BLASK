import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import UploadIcon from "@mui/icons-material/Upload";
const Profile = (props) => {
  const [width, setWidth] = useState(0);
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
            <Button variant="contained" sx={{ mt: 2 }} endIcon={<UploadIcon />}>
              Change
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
            aaa
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
