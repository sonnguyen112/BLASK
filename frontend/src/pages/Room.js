import React from "react";
import "../style/room.css";
import {useLocation} from 'react-router-dom';
import WaitingRoom from "../components/WaitingRoom";
import Quiz from "../components/Quiz";
import { QuizProvider } from "../components/QuizContext";

const Room = (props) => {
    const location = useLocation();
    console.log(location);
    return (
        <div class="room-body">
            {<WaitingRoom token_me={location.state.my_token} token_host={location.state.quiz_info.token_host} PIN={location.state.quiz_info.pin}/>}
            
  
  
        </div>
    );
}

export default Room;