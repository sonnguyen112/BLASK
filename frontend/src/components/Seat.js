import React from "react";
import Member from "./Member"
import "../style/waitingroom.css"

const Seat = (props) => {
    return (
        <div className="seat">
            {props.cells.map((item, index) => (
                    <Member value={item} onClick={() => props.onClick(index)}></Member>
                ))
            }
        </div>
    );
};

export default Seat