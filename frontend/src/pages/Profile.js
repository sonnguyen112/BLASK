import {
  Box,
  Button,
  Paper,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ProfileItem from "../components/ProfileItem";
import React, { useState, useEffect, useRef } from "react";

import UploadIcon from "@mui/icons-material/Upload";
const Profile = (props) => {
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(props.profile.avatar);
  const [profile, setProfile] = useState(props.profile);
  const [open, setOpen] = useState(false);

  const pattern_email = /(\S+@\w+\.\w+)/;
  const pattern_special_character = /(\d)/;

  const [errorMessage, setErrorMessage] = React.useState({
    name: "",
    username: "",
    email: "",
    check: false,
  });
  const ref = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setWidth(ref.current.clientWidth);
  }, [width]);

  const handleChangeProfile = (value, index) => {
    const copyProfile = profile;

    switch (index) {
      case 0:
        copyProfile.username = value;
        break;
      case 1:
        copyProfile.firstname = value;
        break;
      case 2:
        copyProfile.lastname = value;
        break;
      case 3:
        copyProfile.email = value;
        break;
      default:
        break;
    }
    setProfile(copyProfile);
  };
  const saveProfile = () => {
    let message = {
      name: "",
      username: "",
      email: "",
      check: false,
    };
    if (profile.firstname.length === 0 || profile.lastname.length === 0) {
      message.check = true;
      message.name = "Name cannot be empty.";
    } else if (
      pattern_special_character.test(profile.firstname) ||
      pattern_special_character.test(profile.lastname)
    ) {
      message.check = true;
      message.name = "Name cannot contain any special characters.";
    }
    if (profile.username.lenght < 6) {
      message.check = true;
      message.username = "Name should be larger than 6 character.";
    }

    if (!pattern_email.test(profile.email)) {
      message.check = true;
      message.email = "Your email is incorrect.\n";
    }

    setErrorMessage(message);
    setOpen(message.check);

    if (!message.check) {
      fetchEditProfile();
    } else {
      setLoading(false);
    }

    async function fetchEditProfile() {
      const getImageToBase64 = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
        });
      };
      let formData = new FormData();
      // let avatar;
      // const copyAvatar = await getImageToBase64(selectedImage);
      // if (copyAvatar.trim() !== "") {
      //   avatar = copyAvatar.substring(copyAvatar.search("base64,") + 7);
      // }
      formData.append("username", profile.username);
      formData.append("first_name", profile.firstname);
      formData.append("last_name", profile.lastname);
      formData.append("email", profile.email);
      formData.append("upload", selectedImage);
      const response = await fetch(
        "http://localhost:8000/quiz/api/update_profile/",
        {
          mode: "cors",
          method: "PATCH",
          headers: [
            ["Content-Type", "multipart/form-data"],
            ["Authorization", "token " + props.token],
          ],
          body: formData,
        }
      );
      setLoading(false);
      fetchLogin();
    }
    async function fetchLogin() {
      const response = await fetch("http://localhost:8000/auth/api/sign_in", {
        mode: "cors",
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(props.loginInfo),
      });
      console.log(props.loginInfo);

      if (response.status === 200) {
        const json = await response.json();
        const profile = {
          username: json.username,
          firstname: json.first_name,
          lastname: json.last_name,
          email: json.email,
          avatar: `http://localhost:8000${json.avatar}`,
        };
        props.setToken(json.token);
        props.setProfile(profile);
        if (window.localStorage.getItem("remember") === "1") {
          window.localStorage.setItem("token", json.token);
          window.localStorage.setItem("profile", JSON.stringify(profile));
        } else {
          window.sessionStorage.setItem("token", json.token);
          window.sessionStorage.setItem("profile", JSON.stringify(profile));
        }
        setLoading(false);
      }
    }
  };
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
          {errorMessage.username.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              {errorMessage.username}
            </DialogContentText>
          )}
          {errorMessage.name.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              {errorMessage.firstname}.
            </DialogContentText>
          )}
          {errorMessage.email.trim() !== "" && (
            <DialogContentText id="alert-dialog-description">
              {errorMessage.email}.
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
      <Backdrop open={loading} sx={{ zIndex: 10 }}>
        <CircularProgress color="primary" />
      </Backdrop>
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
                backgroundImage: `url(${selectedImage})`,
                backgroundRepeat: "no-repeat",
                borderRadius: "30px",
                border: 2,
                borderColor: "#1976d2",
                backgroundSize: "cover",
              }}
            />
            <Button
              disabled={edit ? false : true}
              variant="contained"
              sx={{ mt: 2 }}
              endIcon={<UploadIcon />}
              component="label"
            >
              Change
              <input
                type="file"
                accept="image/*"
                name="myImage"
                hidden
                onChange={(event) => {
                  if (event.target.files[0]) {
                    const img = URL.createObjectURL(event.target.files[0]);
                    setSelectedImage(img);
                  }
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
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
                "&:hover": { color: "#fff" },
              }}
              onClick={() => {
                setLoading(true);
                setEdit(false);
                saveProfile();
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
            <ProfileItem
              edit={edit}
              index={0}
              profile={profile.username}
              onChangeProfile={handleChangeProfile}
            />
            <ProfileItem
              edit={edit}
              index={1}
              profile={profile.firstname}
              onChangeProfile={handleChangeProfile}
            />
            <ProfileItem
              edit={edit}
              index={2}
              profile={profile.lastname}
              onChangeProfile={handleChangeProfile}
            />
            <ProfileItem
              edit={edit}
              index={3}
              profile={profile.email}
              onChangeProfile={handleChangeProfile}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
