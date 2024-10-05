
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Playform.css'

function PlayerForm({ setPlayers }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate(); // Using useNavigate instead of history

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayers(player1, player2);
    navigate('/game'); // Navigate to the game page
  };

  return (
    <div className='players'>
      <h2>Enter Player Names</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label>Player 1 Name:</label>
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          required
        />
        <label>Player 2 Name:</label>
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default PlayerForm;
