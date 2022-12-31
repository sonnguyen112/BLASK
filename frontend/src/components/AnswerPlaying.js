import React from "react";
import "../style/play.css"

const AnswerPlaying = ({value, index, onClick}) => {
    return (
        <div id={"color"+index.toString()} className="normal-button" onClick={onClick}>
            {value}
        </div>
    );
};

export default AnswerPlaying;