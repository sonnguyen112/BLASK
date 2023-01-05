import React from "react";
import "../style/room.css";
import {useLocation} from 'react-router-dom';
import PlayingRoom from "../components/PlayingRoom";

const Room = (props) => {
    const location = useLocation();
    let data = [];
    for (let i = 0; i < location.state.quiz_info.list_question.length; i++) {
        data.push({
            num_of_second: location.state.quiz_info.list_question[i].num_of_second,
            score: location.state.quiz_info.list_question[i].score,
            question: location.state.quiz_info.list_question[i].description,
            options: location.state.quiz_info.list_option.filter(x => x.question === location.state.quiz_info.list_question[i].id)
        });
    }
    
    return (
        <div>
            {<PlayingRoom 
                title={location.state.quiz_info.title}
                pin={location.state.pin}
                token_me={location.state.name_player}
                token_host={location.state.token_host}
                data={data}/>}
        </div>
    );
}

export default Room;