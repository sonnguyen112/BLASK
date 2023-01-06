import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/joinin.css"

const JoinIn = () => {
    let navigate = useNavigate();
    const [name_input, set_name_input] = useState("")
    const [pin_input, set_pin_input] = useState("")
    const [is_name_input, setCheck] = useState(false);
    const [is_wrong, setWrong] = useState(false)
    const [loading, setLoading] = useState(false)

    const onPINChange = event => {
        set_pin_input(event.target.value);
    }
    useEffect(() => {
        console.log(typeof (pin_input));
    }, [pin_input])
    const onNAMEChange = event => {
        set_name_input(event.target.value);
    }
    const handleSubmitName = () => {
        if (is_name_input !== "") {
            setCheck(true);
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        }
    }
    async function handleAskJoinRoom() {
        setLoading(true);
        const response = await fetch('http://localhost:8000/room/api/join_room/' + (pin_input === "" ? "1" : pin_input), {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json()
        data.pin = pin_input;
        setLoading(false);
        if (response.status !== 404) {
            navigate('/room', {
                state: {
                    quiz_info: data,
                    my_token: name_input
                }
            })
        }
        else {
            setWrong(true);
            document.getElementById('inputnaydetest').style.animation = "shake 0.3s";
            setTimeout(function() {
                document.getElementById('inputnaydetest').style.removeProperty('animation');
            }, 300);
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
                            <input name={"NamePlayer"} placeholder="Your Nickname" defaultValue="" inputMode="text" onChange={onNAMEChange} />
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
                        <div className="joinin-realform">
                            <input id="inputnaydetest" name={"gameId"} placeholder="Game PIN" defaultValue="" inputMode="numeric" onChange={onPINChange} />
                            <button onClick={handleAskJoinRoom}>
                                {!loading && "Enter"}
                                {loading && <div class="loader-5 center"><span></span></div>}
                            </button>
                        </div>
                    </div>
                </div>
                {is_wrong && <div class="warning-tag">
                    We didn't recognize that game PIN. Please check and try again.
                </div>}
            </div>
        );
    }
};

export default JoinIn