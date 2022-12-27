import React from "react";
import "../style/room.css";
import WaitingRoom from "../components/WaitingRoom";
import Quiz from "../components/Quiz";
import { QuizProvider } from "../components/QuizContext";

const Room = (props) => {
    return (
        <div class="room-body">
            
        
            {<WaitingRoom PIN={props.pin}/>}

  
  
        </div>
    );
}

export default Room;