import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");

  function handleClick(i) {
    if (board[i] || winner) return;

    const copy = [...board];
    copy[i] = turn;
    setBoard(copy);

    checkWinner(copy);
    setTurn(turn === "X" ? "O" : "X");
  }

  function checkWinner(b) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let [a,b1,c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        setWinner(b[a]);
        return;
      }
    }

    if (!b.includes("")) setWinner("Tie");
  }

  function reset() {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner("");
  }

  return (
    <div className="wrapper">
      <h1>Tic Tac Toe</h1>
      {winner && <h2>{winner === "Tie" ? "It's a Tie!" : `Winner: ${winner}`}</h2>}

      <div className="board">
        {board.map((cell,i) => (
          <div key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
