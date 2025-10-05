import React, { useState } from "react";

export default function VoteTable({ currentUser }) {
  const [votes, setVotes] = useState({});
  const [players, setPlayers] = useState(["Idris", "Sait", "Doruk"]);

  const handleVote = (player, score) => {
    if (!currentUser) {
      alert("Please login with Discord first!");
      return;
    }

    setVotes((prevVotes) => {
      const playerVotes = prevVotes[player] || {};
      return {
        ...prevVotes,
        [player]: {
          ...playerVotes,
          [currentUser.username]: score, // save last vote of this user
        },
      };
    });
  };

  const calculateAverage = (player) => {
    const playerVotes = votes[player] || {};
    const scores = Object.values(playerVotes);
    if (scores.length === 0) return 0;
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  };

  return (
    <div>
      {currentUser && <h3>Logged in as: {currentUser.username}</h3>}

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Player</th>
            <th>Average</th>
            <th>Vote (1–5)</th>
            <th>Votes (by user)</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const playerVotes = votes[player] || {};
            return (
              <tr key={player}>
                <td>{player}</td>
                <td>{calculateAverage(player)}</td>
                <td>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleVote(player, score)}
                      style={{
                        margin: "2px",
                        backgroundColor:
                          playerVotes[currentUser?.username] === score
                            ? "lightgreen" // highlight last vote
                            : "white",
                      }}
                    >
                      {score}
                    </button>
                  ))}
                </td>
                <td>
                  {Object.entries(playerVotes).map(([user, score]) => (
                    <span
                      key={user}
                      style={{
                        fontWeight:
                          user === currentUser?.username ? "bold" : "normal",
                        marginRight: "10px",
                      }}
                    >
                      {user}→{score}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
