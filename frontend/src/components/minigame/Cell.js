import React from "react";
import "./GameStyles.css"

const Cell = ({value, onClick}) => {
    // const (value, onClick) = props;
    // console.log(value, onClick);
    let tcolor = (value === 'X' ? "blue" : "red");
    return (
        <div className="game-cell" onClick={onClick} id={tcolor}>
            {value}
        </div>
    );
};

export default Cell