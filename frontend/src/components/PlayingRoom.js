import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Question from "../components/Question";
import Questionnaire from "../components/Questionnaire";
import "../style/play.css";
import { Backdrop, CircularProgress } from "@mui/material";

const answerHandler = (
	message,
	token_me,
	token_host,
	client,
	navigate,
	setIndexQues,
	setTypeRender,
	member,
	setMember,
	submit,
	setSubmit,
	setLoading,
	old_member_size,
	data,
	setRankScore
) => {
	let tmp_message = JSON.parse(message.data);
	console.log(message);
	const onAnswer = (name_player, question_id, is_true, remaining_time) => {
		if (token_host === token_me) {
			if (is_true) {
				let newMember = [...member],
					current_submit_member = newMember.findIndex((x) => x.name_player === name_player),
					current_question_index = data.findIndex((x) => x.q_id === question_id)

				console.log(current_question_index)
				let ratio = (remaining_time + 1) / data[current_question_index].num_of_second

				newMember[current_submit_member].score += Math.floor((data[current_question_index].score) * ratio)
				setMember(newMember)
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
			setRankScore([rank, score])
			// setTypeRender(4);
		}
	};
	const onAppend = (name_player, avatar) => {
		let names = [...member].filter(x => x.name_player)
		let set = new Set(names)
		if (set.size === old_member_size) {
			return
		}
		let newmessage = {
			name_player: name_player,
			avatar: avatar,
			score: 0,
		};
		setMember([...member, newmessage]);
	};
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
	const onTimeOut = (name_player) => {
		if (token_host === token_me) {
			let newSubmit = {
				name_player: name_player,
			};
			setSubmit([...submit, newSubmit]);
		}
	};
	switch (tmp_message.type_action) {
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
			onScoreBoard(tmp_message.name_player, tmp_message.rank, tmp_message.score);
			break;
		case "append":
			onAppend(tmp_message.name_player, tmp_message.avatar);
			break;
		case "delete":
			onDelete(tmp_message.name_player);
			break;
		case "timeout":
			onTimeOut(tmp_message.name_player);
		default:
			break;
	}
};

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
	const [index_ques, setIndexQues] = useState(-1);
	const [time_interval, setTimeInt] = useState(5);
	const [time_show_question, setTimeShowQuestion] = useState(-1);
	const [time_show_title, setTimeShowTitle] = useState(-1);
	const [loading, setLoading] = useState(true);

	const [rank_n_score, setRankScore] = useState([])

	const client = useRef(null);

	const [submit, setSubmit] = useState([]);
	const submitRef = useRef(submit);
	useEffect(() => {
		submitRef.current = submit;
	});

	const [member, setMember] = useState([]);
	const memberRef = useRef(member);
	useEffect(() => {
		memberRef.current = member;
	});

	useEffect(() => {
		console.log("aaaaa", memberRef.current.length, props.old_member_size);
		if (memberRef.current.length >= props.old_member_size) {
			setLoading(false);
		} else {
			let s = { type_action: "append", name_player: props.token_me, avatar: "" };
			console.log(JSON.stringify(s));
			if (client.current !== null) {
				if (client.current.readyState === 1) {
					if (props.token_me !== props.token_host) {
						client.current.send(JSON.stringify(s));
					}
				}
				else {
					if (props.token_me !== props.token_host) {
						client.current = new W3CWebSocket(
							"ws://127.0.0.1:8000/ws/play/" + props.pin + "/"
						);
					}
				}
			}
		}
	});

	/*************************************
				  HANDLE SOCKET
	  *************************************/

	useEffect(() => {
		client.current = new W3CWebSocket(
			"ws://127.0.0.1:8000/ws/play/" + props.pin + "/"
		);
		client.current.onopen = () => {
			console.log("WebSocket client.current Connected");
			// setLoading(false)
			console.log(props.token_host, props.token_me, client.current);
			if (props.token_me !== props.token_host) {
				let s = { type_action: "append", name_player: props.token_me, avatar: "" };
				console.log(JSON.stringify(s));
				client.current.send(JSON.stringify(s));
			} else {
				setTimeShowTitle(10);
			}
		};

		// return () => {
		//     console.log("BAO PRO");
		//     client.current.close();
		//     if (client.current.readyState === 1) { // <-- This is important
		//         client.current.close();
		//     }
		// };
	}, []);

	useEffect(() => {
		client.current.onmessage = (message) => {
			console.log("hahaha", message);
			answerHandler(
				message,
				props.token_me,
				props.token_host,
				client.current,
				navigate,
				setIndexQues,
				setTypeRender,
				memberRef.current,
				setMember,
				submitRef.current,
				setSubmit,
				setLoading,
				props.old_member_size,
				props.data,
				setRankScore
			);
		};
	});

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
			client.current.send(message);
			// if (typeof callback !== 'undefined') {
			//   callback();
			// }
		}, 500);
	};

	const waitForConnection = function (callback, interval) {
		if (client.current.readyState === 1) {
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
		if (time_show_title === 0) {
			let s =
				'{"type_action": "next","index_next_ques":' +
				(index_ques + 1).toString() +
				"}";
			// client.current.send(s);
			sendMesage(s);
			setSubmit([]);
			clearTimeout(interval);
		}

		return () => clearTimeout(interval);
	}, [time_show_title]);

	useEffect(() => {
		console.log("index change:", index_ques);
		if (index_ques >= 0) {
			if (index_ques !== props.data.length) {
				setTimeShowQuestion(5);
				setTypeRender(1 + (index_ques === props.data.length ? 4 : 0));
			}
			else {
				let newMember = [...member];
				newMember.sort(function (a, b) { return b.score - a.score })
				setMember(newMember);
				setTypeRender(1 + (index_ques === props.data.length ? 4 : 0));
			}
		}
	}, [index_ques]);

	useEffect(() => {
		if (rank_n_score.length !== 0) {
			setTypeRender(4);
		}
	}, [rank_n_score])

	useEffect(() => {
		console.log("type render change:", typeRender);
	}, [typeRender]);

	///                     THIS IS END FOR TIME PROCESSING

	useEffect(() => {
		console.log(member);
	}, [member]);

	useEffect(() => {
		console.log("rerender");
	});

	useEffect(() => {
		console.log("hai vị thần", submit, member);
		if (submit.length && submit.length === member.length) {
			let newMember = [...member];
			newMember.sort(function (a, b) { return b.score - a.score })
			newMember.map((value, index) => {
				let s = {
					"type_action": "score_board",
					"name_player": value.name_player,
					"rank": index + 1,
					"score": value.score
				};
				sendMesage(JSON.stringify(s));
			}
			)
			if (props.token_host === props.token_me) {
				{
					let s = {
						"type_action": "score_board",
						"name_player": props.token_me,
						"rank": -1,
						"score": -1
					};
					sendMesage(JSON.stringify(s));
				}
			}
		}
	}, [submit]);

	const handleNext = () => {
		let s =
			'{"type_action": "next","index_next_ques":' +
			(index_ques + 1).toString() +
			"}";
		sendMesage(s);
		client.current.send(s);
		setSubmit([]);
		// setTimeShowQuestion(5);
		// setTypeRender(1);
	};
	const handleShowQuesnAns = () => {
		setTypeRender(2);
		setTimeInt(props.data[index_ques].num_of_second);
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
	if (loading) {
		return (
			<div className="container">
				<Backdrop open={loading} sx={{ zIndex: 10 }}>
					<CircularProgress color="primary" />
				</Backdrop>
			</div>
		);
	}
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
						question={props.data[index_ques].question}
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
						data={props.data[index_ques]}
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
					<div className="ranking"> # {rank_n_score[0]} </div>
					<div className="base">
						<div className="txt">
							{props.token_me}
						</div>
						<div className="txt">
							{rank_n_score[1]}
						</div>
					</div>

				</div>
			);
		case 5:
			return props.token_host === props.token_me ? (
				<div className="podium">
					<div className="podium__item">
						<div className="txt-non">
							{member.length >= 2 ? member[1].name_player : ""}
						</div>
						<div className="second txt-non">
							<div className="badge-ribbon-silver">

							</div>
							{member.length >= 2 ? member[1].score : ""}
						</div>
					</div>

					<div className="podium__item">
						<div className="txt-non">
							{member.length >= 1 ? member[0].name_player : ""}
						</div>
						<div className="first txt-non">
							<div className="badge-ribbon-gold">

							</div>
							{member.length >= 1 ? member[0].score : ""}
						</div>
					</div>

					<div className="podium__item">
						<div className="txt">
							{member.length >= 3 ? member[2].name_player : ""}
						</div>
						<div className="third txt-non">
							<div className="badge-ribbon-bronze">

							</div>
							{member.length >= 3 ? member[2].score : ""}
						</div>
					</div>
				</div>
			) : (
				<div className="container">
					Congratulation!
				</div>
			);

		default:
			break;
	}
};

export default PlayingRoom;
