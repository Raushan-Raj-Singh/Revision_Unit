import React, { useState, useEffect } from "react";
import "../components/Tic.css";
import Thor from "../assets/Logo/Thor.png";
import IronMan from "../assets/Logo/IronMan.png";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6], 
  ];

  useEffect(() => {
    if (count >= 5) {
      for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          setLock(true); 
          break;
        }
      }
    }

    if (count === 9 && !winner) {
      setWinner("draw");
      setLock(true);
    }
  }, [board, count, winner]);

  const toggle = (num) => {
    if (lock || board[num] !== "") {
      return;
    }
    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "x(Thor)" : "o(IronMan)";
    setBoard(newBoard);
    setCount(count + 1);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  return (
    <>
      <div className="MainC">
        {board.map((cell, index) => (
          <div className="child" key={index} onClick={() => toggle(index)}>
            {cell === "x(Thor)" ? (
              <img
                style={{ width: "100%", height: "100%" }}
                src={Thor}
                alt="Thor"
              />
            ) : cell === "o(IronMan)" ? (
              <img
                style={{ width: "100%", height: "100%" }}
                src={IronMan}
                alt="Iron Man"
              />
            ) : (
              ""
            )}
          </div>
        ))}
        {winner && (
          <div className="result">
            {winner === "draw"
              ? "It's a Draw!"
              : `Player ${winner.toUpperCase()} Wins!`}
          </div>
        )}
      </div>
      <br />
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
}

export default TicTacToe;
