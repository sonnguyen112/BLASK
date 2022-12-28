import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Cookies from 'universal-cookie';

import CreateQuiz from "./pages/CreateQuiz";
import Room from "./pages/Room";
import JoinIn from "./pages/JoinIn";
import NavPages from "./pages/NavPages";
import "./App.css";
import NoPage from "./pages/NoPage";
function App() {
  const emptyProfile = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
  };

  const localToken = window.localStorage.getItem("token");
  const sessionToken = window.sessionStorage.getItem("token");
  const localProfile = window.localStorage.getItem("profile");
  const sessionProfile = window.sessionStorage.getItem("profile");
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
