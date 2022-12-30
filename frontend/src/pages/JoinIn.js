import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/joinin.css"

const JoinIn = () => {
    let navigate = useNavigate();
    const [name_input, set_name_input] = useState("")
    const [pin_input, set_pin_input] = useState("")
    const [is_name_input, setCheck] = useState(false);
    const onPINChange = event => {
        set_pin_input(event.target.value);
    }
    const onNAMEChange = event => {
        set_name_input(event.target.value);
    }
    const handleSubmitName = () => {
        if (is_name_input !== "") {
            setCheck(true);
        }
    }
    async function handleAskJoinRoom() {
        console.log(pin_input)
        const response = await fetch('http://localhost:8000/room/api/join_room/' + pin_input, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let data = await response.json()
        data.pin = pin_input;
        console.log(data)
        if (data.token_host !== "") {
            navigate('/room', {
                state: {
                    question_info: null,
                    quiz_info: data,
                    my_token: name_input
                }
            })
        }

    }
    if (is_name_input === false) {
        return (
            <div>
                <div className="joinin-background">
                    <div className="square"></div>
                    <div className="circle"></div>
                    <div className="blur">

                    </div>
                    <div className="joinin-form">
                        <div className="joinin-logo-blask">
                            BLASK!
                        </div>
                        <div className="joinin-fakeform">
                            <input name={"NamePlayer"} placeholder="Your Nickname" inputMode="text" onChange={onNAMEChange} />
                            <button type='button' onClick={handleSubmitName}>
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className="joinin-background">
                    <div className="square"></div>
                    <div className="circle"></div>
                    <div className="blur">

                    </div>
                    <div className="joinin-form">
                        <div className="joinin-logo-blask">
                            BLASK!
                        </div>
                        <div>
                            <input name={"gameId"} placeholder="Game PIN" inputMode="numeric" onChange={onPINChange} />
                            <button onClick={handleAskJoinRoom}>
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default JoinIn