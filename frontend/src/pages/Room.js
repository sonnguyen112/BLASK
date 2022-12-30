import React from "react";
import "../style/room.css";
import {useLocation} from 'react-router-dom';
import WaitingRoom from "../components/WaitingRoom";

const Room = (props) => {
    const location = useLocation();
    let quiz_info = {
        title: location.state.quiz_info.title,
        list_question: location.state.quiz_info.list_question,
        list_option: location.state.quiz_info.list_option,
    }
    console.log(quiz_info)
    return (
        <div class="room-body">
            {<WaitingRoom quiz_info={quiz_info} token_me={location.state.my_token} token_host={location.state.quiz_info.token_host} PIN={location.state.quiz_info.pin}/>}  
        </div>
    );
}

export default Room;