import React, { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
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
        let client = await new W3CWebSocket("ws://127.0.0.1:8000/ws/wait/" + pin_input + "/");
        console.log(name_input)
        client.onopen = () => {
            console.log("WebSocket Client Connected");
            let s = '{ "name_player": "'+ name_input +'", "avatar": "", "is_start": false }'
            console.log(s);
            client.send(s);
            let data2 = {
                pin: pin_input,
                token_host: null
            };
            navigate('/room', {state: {
                question_info: null,
                quiz_info: data2,
                my_token: 1
            }})
        };
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
                        <form>
                            <input name={"gameId"} placeholder="Game PIN" inputMode="numeric" onChange={onPINChange} />
                            <button onClick={handleAskJoinRoom}>
                                Enter
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default JoinIn