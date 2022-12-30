import React, { useState, useEffect } from "react";
import Question from "../components/Question";
import Questionnaire from "../components/Questionnaire";
import "../style/play.css";

let data = [
    {
        question: "Lộc có db không?",
        options: ["Có", "Có cũng như không", "Không", "Không cũng như có"]
    },
    {
        question: "Lộc là học bá huh?",
        options: ["Học cũng bá á", "Học cũng béc á"]
        // , "Học như ...", "Thường thôi"
    }
];

const answerHandler = (message, token_me, token_host, client, member, setMember) => {
    let tmp_message = JSON.parse(message.data);

    const onAnswer = (name_player, answer, remaining_time) => {
        if (token_host === token_me) {

        }
    }
    const onReceive = (name_player, score) => {
        if (name_player === token_me) {

        }
    }
    switch (tmp_message.type_action) {
        case "answer":
            onAnswer(tmp_message.name_player, tmp_message.answer, tmp_message.remaining_time);
            break;
        case "receive":
            onReceive(tmp_message.name_player, tmp_message.score);
            break;
    }
}

const Play = () => {
    const [typeRender, setTypeRender] = useState(1);
    /*
        1. Screen question for 5s
        2. Screen question + answer + timer
        3. After answer (player only)
        4. Screen result
        5. Screen final
    */
    const [index_ques, setIndexQues] = useState(0);
    const [time_interval, setTimeInt] = useState(5);
    const [time_show_question, setTimeShowQuestion] = useState(5);
    const handleChoose = (index) => {

    }
    useEffect(() => {
        const interval = setInterval(() => setTimeShowQuestion(time_show_question - 1), 1000);

        if (time_show_question === 0) {
            handleShowQuesnAns();
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [time_show_question]);

    useEffect(() => {
        setTypeRender(1 + (index_ques === data.length ? 4 : 0));
        if(index_ques !== data.length) {
            setTimeShowQuestion(5)
        }
        console.log("index change:", index_ques)
    }, [index_ques])

    useEffect(() => {
        console.log("type render change:", typeRender)
    }, [typeRender])

    const handleNext = async () => {
        await setIndexQues(index_ques + 1);
        // setTimeShowQuestion(5);
        // setTypeRender(1);
    }
    const handleShowQuesnAns = () => {
        setTypeRender(2);
        setTimeInt(5);
    }
    const timeout = () => {
        setTypeRender(4);
    }
    switch (typeRender) {
        case 1:
            return (
                <div className="container">
                    <Questionnaire question={data[index_ques].question} onClick={handleChoose} value={time_interval} setTimeInt={setTimeInt} timeout={timeout} />
                </div>
            )
        case 2:
            return (
                <div className="container">
                    <Question data={data[index_ques]} onClick={handleChoose} value={time_interval} setTimeInt={setTimeInt} timeout={timeout} />
                </div>
            )
        case 3:
            break;
        case 4:
            return (
                <div className="container">
                    <button onClick={handleNext}>Next</button>
                </div>
            )
        case 5:
            return (
                <div className="container">
                    FINAL RESULT
                </div>
            )
    }
}

export default Play;