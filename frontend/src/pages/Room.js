import React, { useEffect, useState, useRef } from "react";
import "../style/room.css";
import { useLocation, useNavigate } from "react-router-dom";
import WaitingRoom from "../components/WaitingRoom";
import PlayingRoom from "../components/PlayingRoom";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const memberHandler = (
  message,
  pin,
  quiz_info,
  token_me,
  token_host,
  navigate,
  client,
  member,
  setMember,
  submit,
  setSubmit,
  setTypeRoom,
  data,
  setIndexQues,
  setRankScore
) => {
  console.log("1", message);
  let tmp_message = JSON.parse(message.data);

  const onDelete = (name_player) => {
    console.log(name_player);
    let index = [...member].findIndex((m) => m.name_player === name_player);
    if (index !== -1) {
      const copyMember = [...member];
      copyMember.splice(index, 1);
      setMember(copyMember);
    }

    if (token_host !== token_me && name_player === token_me) {
      client.close();
      navigate("/");
    }
  };
  const onAppend = (name_player, avatar) => {
    let newmessage = {
      name_player: name_player,
      avatar: avatar,
      score: 0,
    };
    setMember([...member, newmessage]);
  };
  const onPlay = async () => {
    setTypeRoom("play");
  };
  const onAnswer = (name_player, question_id, is_true, remaining_time) => {
    if (token_host === token_me) {
      if (is_true) {
        let newMember = [...member],
          current_submit_member = newMember.findIndex(
            (x) => x.name_player === name_player
          ),
          current_question_index = data.findIndex(
            (x) => x.q_id === question_id
          );

        console.log(current_question_index);
        let ratio =
          (remaining_time + 1) / data[current_question_index].num_of_second;

        newMember[current_submit_member].score += Math.floor(
          data[current_question_index].score * ratio
        );
        setMember(newMember);
      }

      let newSubmit = {
        name_player: name_player,
      };
      setSubmit([...submit, newSubmit]);
    }
  };
  const onNext = (index_next_ques) => {
    setIndexQues(index_next_ques);
  };
  const onScoreBoard = (name_player, rank, score) => {
    if (name_player === token_me) {
      setRankScore([rank, score]);
      // setTypeRender(4);
    }
  };
  const onTimeOut = (name_player) => {
    if (token_host === token_me) {
      let newSubmit = {
        name_player: name_player,
      };
      setSubmit([...submit, newSubmit]);
    }
  };
  switch (tmp_message.type_action) {
    case "append":
      onAppend(tmp_message.name_player, tmp_message.avatar);
      break;
    case "delete":
      onDelete(tmp_message.name_player);
      break;
    case "play":
      onPlay();
      break;
    case "answer":
      onAnswer(
        tmp_message.name_player,
        tmp_message.question_id,
        tmp_message.is_true,
        tmp_message.remaining_time
      );
      break;
    case "next":
      onNext(tmp_message.index_next_ques);
      break;
    case "score_board":
      onScoreBoard(
        tmp_message.name_player,
        tmp_message.rank,
        tmp_message.score
      );
      break;
    case "timeout":
      onTimeOut(tmp_message.name_player);
      break;
    default:
      break;
  }
};

let data = [];

const Room = (props) => {
  const location = useLocation();
  const [typeRoom, setTypeRoom] = useState("wait");
  const [member, setMember] = useState([]);
  const memberRef = useRef(member);

  useEffect(() => {
    memberRef.current = member;
  });

  const [submit, setSubmit] = useState([]);
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  });
  const [rank_n_score, setRankScore] = useState([]);
  const [index_ques, setIndexQues] = useState(-1);
  let quiz_info = {
    title: location.state.quiz_info.title,
    list_question: location.state.quiz_info.list_question,
    list_option: location.state.quiz_info.list_option,
  };
  const client = new W3CWebSocket(
    "ws://127.0.0.1:8000/ws/wait/" + location.state.quiz_info.pin + "/"
  );
  const navigate = useNavigate();
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();

      console.log("beforeunload event triggered");

      return (event.returnValue = "Are you sure you want to exit?");
    };

    const handleKickPlayer = () => {
      let s =
        '{ "type_action": "delete","name_player": "' +
        location.state.my_token +
        '", "avatar": ""}';

      client.send(s);
    };

    window.addEventListener("beforeunload", handleTabClose);
    window.addEventListener("unload", handleKickPlayer);
    client.onopen = () => {
      console.log("newmessage");
      console.log("WebSocket Client Connected");
      if (location.state.my_token !== location.state.quiz_info.token_host) {
        let s =
          '{ "type_action": "append", "name_player": "' +
          location.state.my_token +
          '", "avatar": ""}';

        client.send(s);
      }
    };

    for (let i = 0; i < location.state.quiz_info.list_question.length; i++) {
      data.push({
        num_of_second: location.state.quiz_info.list_question[i].num_of_second,
        score: location.state.quiz_info.list_question[i].score,
        q_id: location.state.quiz_info.list_question[i].id,
        question: location.state.quiz_info.list_question[i].description,
        options: location.state.quiz_info.list_option.filter(
          (x) => x.question === location.state.quiz_info.list_question[i].id
        ),
      });
    }
    client.onmessage = (message) => {
      memberHandler(
        message,
        location.state.quiz_info.pin,
        quiz_info,
        location.state.my_token,
        location.state.quiz_info.token_host,
        navigate,
        client,
        memberRef.current,
        setMember,
        submitRef.current,
        setSubmit,
        setTypeRoom,
        data,
        setIndexQues,
        setRankScore
      );
    };

    return () => {
      console.log("BAO PRO");
      window.removeEventListener("beforeunload", handleTabClose);
      window.removeEventListener("unload", handleKickPlayer);
      client.close();
    };
  }, []);
  if (typeRoom === "wait") {
    return (
      <div class="room-body">
        {
          <WaitingRoom
            setTypeRoom={setTypeRoom}
            quiz_info={quiz_info}
            token_me={location.state.my_token}
            token_host={location.state.quiz_info.token_host}
            PIN={location.state.quiz_info.pin}
            client={client}
            member={member}
            setMember={setMember}
          />
        }
      </div>
    );
  } else {
    return (
      <div>
        {
          <PlayingRoom
            title={location.state.quiz_info.title}
            pin={location.state.quiz_info.pin}
            token_me={location.state.my_token}
            token_host={location.state.quiz_info.token_host}
            data={data}
            // old_member_size={location.state.old_member_size}
            client={client}
            setSubmit={setSubmit}
            index_ques={index_ques}
            rank_n_score={rank_n_score}
            member={member}
            setMember={setMember}
            submit={submit}
          />
        }
      </div>
    );
  }
};

export default Room;
