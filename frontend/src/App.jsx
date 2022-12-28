import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
// import Cookies from 'universal-cookie';

import CreateQuiz from "./pages/CreateQuiz";
import Room from "./pages/Room";
import JoinIn from "./pages/JoinIn";
import NavPages from "./pages/NavPages";
import './App.css'
function App() {

    const emptyProfile = {
                        "username": "",
                        "firstname": "",
                        "lastname": "",
                        "email": "",
                        "avatar": ""
                        }


       
        

    const [token, setToken] = React.useState(window.localStorage.getItem("token") ? window.localStorage.getItem("token") : "")
    const [profile, setProfile] = React.useState(window.localStorage.getItem("profile") ? window.localStorage.getItem("profile") : emptyProfile)

    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NavPages token={token} setToken={setToken} profile={profile} setProfile={setProfile}/>} />
                <Route path="create-quiz" element={<CreateQuiz profile={profile} token={token}/>} />
                <Route path="room" element={<Room/>} />
                <Route path="joinin" element={<JoinIn/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;