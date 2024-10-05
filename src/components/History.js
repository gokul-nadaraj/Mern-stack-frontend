import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/api/games')
      .then(response => {
        setGames(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Game History</h2>
      {games.map((game, index) => (
        <div key={index}>
          <h3>Game {index + 1}</h3>
          <p>Players: {game.players.player1} vs {game.players.player2}</p>
          <p>Final Scores: {game.finalScores.player1} - {game.finalScores.player2}</p>
          {game.rounds.map((roundData, idx) => (
            <p key={idx}>Round {roundData.round}: {roundData.winner} won</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default History;
