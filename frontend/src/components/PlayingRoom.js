import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Question from "../components/Question";
import Questionnaire from "../components/Questionnaire";
import "../style/play.css";
import { Button } from "@mui/material";

const PlayingRoom = (props) => {
  const navigate = useNavigate();
  const [typeRender, setTypeRender] = useState(0);
  /*
		  1. Screen question for 5s
		  2. Screen question + answer + timer
		  3. After answer (player only)
		  4. Screen result
		  5. Screen final
	  */

  const [time_interval, setTimeInt] = useState(5);
  const [time_show_question, setTimeShowQuestion] = useState(-1);
  const [time_show_title, setTimeShowTitle] = useState(10);

  /*************************************
				  HANDLE SOCKET
	  *************************************/
  const goHome = () => {
    navigate("/");
  };

  const handleChoose = (option_id, question_id) => {
    if (props.token_host !== props.token_me) {
      let s = {
        type_action: "answer",
        name_player: props.token_me,
        question_id: question_id,
        option_id_player_choose: option_id,
        remaining_time: time_interval,
      };
      // client.current.send(JSON.stringify(s));
      sendMesage(JSON.stringify(s));
      setTypeRender(3);
    }
  };

  const sendMesage = function (message) {
    waitForConnection(function () {
      console.log(message);
      props.client.send(message);
      // if (typeof callback !== 'undefined') {
      //   callback();
      // }
    }, 500);
  };

  const waitForConnection = function (callback, interval) {
    if (props.client.readyState === 1) {
      console.log("kết nối nè");
      callback();
    } else {
      console.log("chưa kết nối nè");
      // optional: implement backoff for interval here
      setTimeout(function () {
        waitForConnection(callback, interval);
      }, interval);
    }
  };

  ///                     THIS IS USED FOR TIME PROCESSING
  useEffect(() => {
    const interval = setTimeout(
      () => setTimeShowQuestion(time_show_question - 1),
      1000
    );

    if (time_show_question === 0) {
      handleShowQuesnAns();
      clearTimeout(interval);
    }

    return () => clearTimeout(interval);
  }, [time_show_question]);

  useEffect(() => {
    const interval = setTimeout(
      () => setTimeShowTitle(time_show_title - 1),
      1000
    );
    if (time_show_title === 0 && props.token_host === props.token_me) {
      let s =
        '{"type_action": "next","index_next_ques":' +
        (props.index_ques + 1).toString() +
        "}";
      // client.current.send(s);
      sendMesage(s);
      props.setSubmit([]);
      clearTimeout(interval);
    }

    return () => clearTimeout(interval);
  }, [time_show_title]);

  useEffect(() => {
    console.log("index change:", props.index_ques);
    if (props.index_ques >= 0) {
      if (props.index_ques !== props.data.length) {
        setTimeShowQuestion(5);
        setTypeRender(1 + (props.index_ques === props.data.length ? 4 : 0));
      } else {
        let newMember = [...props.member];
        newMember.sort(function (a, b) {
          return b.score - a.score;
        });
        props.setMember(newMember);
        setTypeRender(1 + (props.index_ques === props.data.length ? 4 : 0));
      }
    }
  }, [props.index_ques]);

  useEffect(() => {
    if (props.rank_n_score.length !== 0) {
      setTypeRender(4);
    }
  }, [props.rank_n_score]);

  useEffect(() => {
    console.log("type render change:", typeRender);
  }, [typeRender]);

  ///                     THIS IS END FOR TIME PROCESSING

  useEffect(() => {
    console.log("hai vị thần", props.submit, props.member);
    if (
      props.submit.length &&
      props.submit.length === props.member.length &&
      props.token_host === props.token_me
    ) {
      let newMember = [...props.member];
      newMember.sort(function (a, b) {
        return b.score - a.score;
      });
      newMember.map((value, index) => {
        let s = {
          type_action: "score_board",
          name_player: value.name_player,
          rank: index + 1,
          score: value.score,
        };
        sendMesage(JSON.stringify(s));
      });

      if (props.token_host === props.token_me) {
        {
          let s = {
            type_action: "score_board",
            name_player: props.token_me,
            rank: -1,
            score: -1,
          };
          sendMesage(JSON.stringify(s));
        }
      }
    }
  }, [props.submit]);

  const handleNext = () => {
    let s =
      '{"type_action": "next","index_next_ques":' +
      (props.index_ques + 1).toString() +
      "}";
    sendMesage(s);
    // client.current.send(s);
    props.setSubmit([]);
    // setTimeShowQuestion(5);
    // setTypeRender(1);
  };
  const handleShowQuesnAns = () => {
    setTypeRender(2);
    setTimeInt(props.data[props.index_ques].num_of_second);
  };
  const timeout = () => {
    if (props.token_host !== props.token_me) {
      let s = {
        type_action: "timeout",
        name_player: props.token_me,
      };
      // client.current.send(JSON.stringify(s));
      sendMesage(JSON.stringify(s));
      // client.current.send(JSON.stringify(s));
    }
  };

  switch (typeRender) {
    case 0:
      return (
        <div className="container">
          <div className="questionnaire">{props.title}</div>
          <div class="loader-5 center">
            <span></span>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="container">
          <Questionnaire
            question={props.data[props.index_ques].question}
            onClick={handleChoose}
            value={time_interval}
            setTimeInt={setTimeInt}
            timeout={timeout}
          />
        </div>
      );
    case 2:
      return (
        <div className="container">
          <Question
            data={props.data[props.index_ques]}
            onClick={handleChoose}
            value={time_interval}
            setTimeInt={setTimeInt}
            timeout={timeout}
          />
        </div>
      );
    case 3:
      return (
        <div className="container">
          <div class="loader-5 center">
            <span></span>
          </div>
        </div>
      );
    case 4:
      return props.token_host === props.token_me ? (
        <div className="container">
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <div className="container">
          <div className="ranking"> # {props.rank_n_score[0]} </div>
          <div className="base">
            <div className="txt">{props.token_me}</div>
            <div className="txt">{props.rank_n_score[1]}</div>
          </div>
        </div>
      );
    case 5:
      return props.token_host === props.token_me ? (
        <div className="podium">
          <Button onClick={goHome} sx={{ backgroundColor: "#fefefe" }}>
            Next
          </Button>
          <div className="podium__item">
            <div className="txt-non">
              {props.member.length >= 2 ? props.member[1].name_player : ""}
            </div>
            <div className="second txt-non">
              <div className="badge-ribbon-silver"></div>
              {props.member.length >= 2 ? props.member[1].score : ""}
            </div>
          </div>

          <div className="podium__item">
            <div className="txt-non">
              {props.member.length >= 1 ? props.member[0].name_player : ""}
            </div>
            <div className="first txt-non">
              <div className="badge-ribbon-gold"></div>
              {props.member.length >= 1 ? props.member[0].score : ""}
            </div>
          </div>

          <div className="podium__item">
            <div className="txt-non">
              {props.member.length >= 3 ? props.member[2].name_player : ""}
            </div>
            <div className="third txt-non">
              <div className="badge-ribbon-bronze"></div>
              {props.member.length >= 3 ? props.member[2].score : ""}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <Button onClick={goHome} sx={{ backgroundColor: "#fefefe" }}>
            Next
          </Button>
          Congratulation!
        </div>
      );

    default:
      break;
  }
};

export default PlayingRoom;
