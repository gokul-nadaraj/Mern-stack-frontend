import React from 'react';

function ScoreBoard({ round, scores }) {
  return (
    <div className='score'>
      <h3>Score after Round {round - 1}</h3>
      <p>Player 1: {scores.player1}</p>
      <p>Player 2: {scores.player2}</p>
    </div>
  );
}

export default ScoreBoard;
