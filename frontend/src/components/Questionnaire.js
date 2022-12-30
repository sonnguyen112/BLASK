import React from "react";
import "../style/play.css"

const Questionnaire = (props) => {
    return (
        <div>
            <div className="questionnaire">
                {props.question}
                <div className="progress-bg">
                    <div className="progress-bar">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;