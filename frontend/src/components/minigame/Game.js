import React, { useState } from "react"
import Board from "./Board"
import "./GameStyles.css"
import { checkWin } from "./Utils"

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true);
    const winner = checkWin(board)
    const handleClick = (index) => {
        const copyBoard = [...board];
        if (winner || copyBoard[index]) return;
        copyBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(copyBoard);
        setXIsNext(!xIsNext);
    };
    const handleResetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    }
    let tcolor = (!xIsNext ? "blue" : "red");
    return (
        <div className="blask-minigame">
            <div className="game" id={tcolor}>
                <Board cells={board} onClick={handleClick}>

                </Board>
                {winner ? `winner is ${xIsNext ? 'O' : 'X'}` : ""}
                
                <button className="blask-minigame-reset" onClick={handleResetGame}>Reset Now</button>
            </div>
        </div>
    );
};

export default Game