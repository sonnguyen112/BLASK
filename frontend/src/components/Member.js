import React from "react";
import "../style/waitingroom.css"

const Member = ({value, onClick}) => {
    // const (value, onClick) = props;
    // console.log(value, onClick);
    console.log(value);
    return (
        // <div className="game-cell" onClick={onClick} id={tcolor}>
        <div className="member" onClick={onClick}>
            {value.name_player}
        </div>
    );
};

export default Member