import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Cookies from 'universal-cookie';

import CreateQuiz from "./pages/CreateQuiz";
import Room from "./pages/Room";
import JoinIn from "./pages/JoinIn";
import NavPages from "./pages/NavPages";
import "./App.css";
import Play from "./pages/Play";
import LearderBoard from "./components/LeaderBoard";
function App() {
  const emptyProfile = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
  };

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });
  const localToken = window.localStorage.getItem("token");
  const sessionToken = window.sessionStorage.getItem("token");
  const remember = window.localStorage.getItem("remember");
  const localProfile =
    remember === "1"
      ? JSON.parse(window.localStorage.getItem("profile"))
      : null;
  const sessionProfile =
    remember !== "1"
      ? JSON.parse(window.sessionStorage.getItem("profile"))
      : null;
  const [token, setToken] = React.useState(
    localToken ? localToken : sessionToken ? sessionToken : ""
  );
  const [profile, setProfile] = React.useState(
    localProfile ? localProfile : sessionProfile ? sessionProfile : emptyProfile
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <NavPages
              loginInfo={loginInfo}
              setLoginInfo={setLoginInfo}
              token={token}
              setToken={setToken}
              profile={profile}
              setProfile={setProfile}
            />
          }
        />
        <Route
          path="create-quiz"
          element={<CreateQuiz profile={profile} token={token} />}
        />
        <Route path="room" element={<Room />} />
        <Route path="joinin" element={<JoinIn />} />
        <Route path="ld" element={<LearderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
